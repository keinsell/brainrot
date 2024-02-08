import {Logger, NotFoundException} from '@nestjs/common'
import {isNil}                     from '../../../../utilities/type-utils/index.js'

// WriteRepository can:
// - Fetch an entity by unique identifier
// - Create an entity
// - Update an entity
// - Delete an entity
// WriteRepository cannot:
// - Fetch multiple entities
// - Fetch an entity by any other criteria than its unique identifier
// - Fetch an entity by multiple criteria
// - Fetch an entity by a criteria other than its unique identifier
// - Aggregate entities
// - List entities
// - Count entities

function logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;

	return {
		value: function (...args: any[]) {
			console.log(`Calling ${key}(${args})`);
			originalMethod.apply(this, args);
		},
	};
}


/**
 * Represents a generic write repository.
 *
 * @template T - The type of the entity.
 */
export abstract class WriteRepository<T> {
	private _hookLogger: Logger = new Logger('repository:hooks')


	abstract create(entity: T): Promise<T>;


	abstract update(entity: T): Promise<T>;


	abstract delete(entity: T): Promise<void>;


	abstract exists(entity: T): Promise<boolean>;


	async save(entity: T): Promise<T> {
		this.beforeHook(this.save, entity)

		this.beforeHook(this.exists, entity)
		const doesExist = await this.exists(entity)
		this.after(this.exists, doesExist)

		if (doesExist) {
			this.beforeHook(this.update, entity)
			const updated = await this.update(entity)
			this.after(this.update, entity)
			this.after(this.save, updated)
			return updated
		} else {
			this.beforeHook(this.create, entity)
			const created = await this.create(entity)
			this.after(this.create, created)
			this.after(this.save, created)
			return created
		}
	}


	abstract findById(id: string): Promise<T | null>;


	async getById(id: string): Promise<T> {
		const entity = await this.findById(id)

		if (isNil(entity)) {
			throw new NotFoundException(`Entity with id ${id} not found`)
		}

		return entity
	}


	beforeHook(func: Function, payload?: unknown) {
		this._hookLogger.debug(`${this.constructor.name}.${func.name}(${JSON.stringify(payload)})`)
	}


	after(func: Function, result?: unknown) {
		this._hookLogger.verbose(`${this.constructor.name}.${func.name}(...) => ${JSON.stringify(result)}`)
	}
}