import {confirm, intro, log, outro, select, spinner}         from "@clack/prompts"
import Conf                                                  from 'conf';
import {MurmurHash3}                                         from 'murmurhash-wasm';
import color                                                 from 'picocolors'

const store = new Conf<{
	migrations: {
		[key: string]: ExecutionPlan<ExecutionContext<any>>
	}
}>({configName: "datapatch", watch:true, projectName: "datapatch" })

export interface PlanUnit<I extends ExecutionContext<unknown>, O extends ExecutionContext<unknown> = ExecutionContext<unknown>> {
	input: I
	output?: O
	diff?: any
}

export type ExecutionContext<T> = {
} & T;

export type ExecutionPlan<T extends ExecutionContext<unknown>> = {
	id: string
	description?: string | undefined
	context: PlanUnit<T>[]
}

// TODO: Generate diffs between input and output
export abstract class DatapatchPlanGenerator<T extends ExecutionContext<unknown>> {
	private plan: ExecutionPlan<T>

	constructor(planId: string, description?: string) {
		this.plan = {
			id: planId,
			description: description,
			context: []
		}
	}

	abstract transform?(input: T): Promise<T>

	async addSingleUnit(input: T, spinner?: {message: (mgs: string) => void, start: () => void, stop: () => void}) {
		const transformed = this.transform ? await this.transform(input) : input
		const unit = {
			input: input,
			output: transformed,
			diff: undefined
		}
		this.plan.context.push(unit)
	}

	async addMultipleUnits(inputs: T[]) {
		const s = spinner();
		const promises = inputs.map(async (input) => {
				await this.addSingleUnit(input, s)
			}
		)
		await Promise.all(promises)
	}

	provideData(inputs: T[]) {
		return this.addMultipleUnits(inputs)
	}

	/**
	 * This method will compile a ready-to-use plan and save it in the persistent storage.
	 * @returns {ExecutionPlan<T>}
	 */
	compile(): ExecutionPlan<T> {
		storePlan(this.plan)
		return this.plan
	}
}

export function storePlan(plan: ExecutionPlan<ExecutionContext<unknown>>) {
	const planHash = MurmurHash3.hash32(plan.id, 0)
	const planKey = `migrations.${planHash.toString('hex')}`

	const storePath = store.path

	store.set(planKey, plan)
	log.message(`Plan ${color.yellow(plan.id)} stored in ${color.green(storePath)} (${color.green(planKey)})`)
	return planKey
}

export function fetchPlan(hash: string): ExecutionPlan<ExecutionContext<unknown>> {
	return store.get(`migrations.${hash}`)
}

// Example datapatching use case:
// 1. Fetch all orders
// 2. Filter orders by status
// 3. Update the total price of each order
// 4. (Apply) Save the updated orders
// 5. (Rollback) Revert the total price of each order

export type ApplyUnitfFn<T extends ExecutionContext<unknown>> = (input: T) => Promise<T | void>
export type RollbackUnitFn<T extends ExecutionContext<unknown>> = (input: T) => Promise<T | void>
export type TransformFn<T extends ExecutionContext<unknown>> = (input: T) => Promise<T | void>


export class CLI<T extends ExecutionContext<unknown>> {
	private OPERATION_MODE: 'apply' | 'rollback' | undefined
	public name: string
	private plan: ExecutionPlan<T> | undefined

	constructor(
		public metadata: {
			name: string
		},
		public implementation: {
			rollback: RollbackUnitFn<T>,
			apply: ApplyUnitfFn<T>,
		},
		public planner: DatapatchPlanGenerator<T>,
	) {
		this.name = metadata.name
	}

	async cli() {
		console.log();
		intro(color.inverse(` ${this.name} `));

		const operationMode = await select({
			message: 'Select running mode:',
			options: [
				{ value: 'apply', label: 'Apply' },
				{ value: 'rollback', label: 'Rollback' },
			],
		});

		this.OPERATION_MODE = operationMode as 'apply' | 'rollback'

		if (operationMode === 'rollback') {
			await this.promptPlanSearch()
		} else {
			const shouldGeneratePlan = await confirm({
				message: 'Do you want to generate a plan?',
				initialValue: true,
				active: 'yes',
				inactive: 'no',
			});

			if (shouldGeneratePlan) {
				this.plan = await this.generatePlan()
			} else {
				await this.promptPlanSearch()
			}
		}

		await this.outputSummaryOfPlan(this.plan!)
		const shouldContinue = await this.confirmExecutionOfOperation()

		if (shouldContinue) {
			await this.applyOperation(this.plan!)
		} else {
			outro('Operation cancelled.')
			return;
		}

		outro("Mission accomplished!")
	}

	private async applyOperation(plan: ExecutionPlan<T>) {
		log.step(`Applying plan ${color.yellow(this.plan!.id)}...`)

		const spin = spinner();
		spin.start(`Applying unit ${Math.random()}...`)

		const tasks = this.plan!.context.map(async (unit) => {
			await this.implementation.apply(unit as  any)
			log.success(`Unit applied: ${JSON.stringify(unit?.diff || null)}`)
		})

		await Promise.all(tasks)

		spin.stop()
		log.step(`Plan ${color.yellow(this.plan!.id)} applied.`)
	}

	private async rollbackOperation(plan: ExecutionPlan<T>) {
		log.step(`Rolling back plan ${color.yellow(this.plan!.id)}...`)

		const tasks = this.plan!.context.map(async (unit) => {
			await this.implementation.rollback(unit.input)
		})

		await Promise.all(tasks)
	}

	private discoverPreviousPlansForAPrompt(): {value: string, label: string}[] {
		const migrations = store.get('migrations')
		const keys = Object.keys(migrations)
		return keys.map((key) => {
			return {
				value: key,
				label: key
			}
		})
	}

	private async generatePlan(): Promise<ExecutionPlan<T>> {
		const s = spinner();
		s.start('Generating plan...');
		this.plan = this.planner.compile()
		s.stop()
		return this.plan
	}

	private async readPlanByHash(hash:string): Promise<ExecutionPlan<T> | null> {
	const plan = fetchPlan(hash) as ExecutionPlan<T>

		if (plan) {
			return plan
		} else {
			return null
		}
	}

	private async promptPlanSearch() {
		const s = spinner();
		s.start('Discovering previous plans...');
		const previousPlans = this.discoverPreviousPlansForAPrompt()
		s.stop(`Discovered ${previousPlans.length} previous plans.`)

		const previousPlan = await select({
			message: 'Select a previously saved plan:',
			options: [
				...previousPlans
			],
		});

		const planByHash = await this.readPlanByHash(previousPlan as string)

		if (planByHash) {
			this.plan = planByHash
		} else {
			throw new Error('Plan not found')
		}
	}

	private async outputSummaryOfPlan(plan: ExecutionPlan<T>) {
		log.message(`Patch will change ${color.green(this.plan!.context.length)} entries.
Plan identifier: ${color.yellow(MurmurHash3.hash32(this.plan!.id, 0).toString('hex'))}
		`);
	}

	private confirmExecutionOfOperation() {
		return confirm({
			message: `Do you want to ${this.OPERATION_MODE} the plan? ${color.red('This operation is' +
				' irreversible!')}`,
			initialValue: false,
			active: 'yes',
			inactive: 'no',
		});
	}
}