export interface AggregateRootProperties {
	id?: any | undefined
	createdAt?: Date
	updatedAt?: Date
}

// TODO: https://linear.app/keinsell/issue/PROD-93/add-aggregate-root-base-class
export class AggregateRoot<T extends Object = {}> implements AggregateRootProperties {
	private _id: any | undefined;

	constructor(
	aggregateBaseProperties: Partial<AggregateRootProperties>,
	) {
		this._id = aggregateBaseProperties.id
		this.createdAt = new Date()
		this.updatedAt = new Date()
	}

	/**
	 * Array that holds events data.
	 *
	 * @type {Array<any>}
	 */
	private _events: Array<any> = []
	/**
	 * Represents the current version of the software.
	 *
	 * @type {number}
	 */
	private _version: number    = 1

	public readonly createdAt: Date
	public updatedAt: Date


	//private _stateMachine: StateMachine<T>

	/**
	 * Retrieves the uncommitted events.
	 *
	 * @returns {Array} An array containing the uncommitted events.
	 */
	public getUncommittedEvents() {
		return this._events
	}


	/**
	 * Appends an event to the list of events.
	 *
	 * @param {any} event - The event to be added.
	 * @return {void}
	 */
	protected appendEvent(event: any) {
		this._events.push(event)
		this.bumpUpdateDate()
		this.bumpVersion()
	}


protected bumpVersion() {
	this._version = this._version + 1
}


	/**
	 * Executes a command with the given parameters.
	 *
	 * @param {any} command - The command to be executed.
	 *
	 * @return {void}
	 */
	protected executeCommand(command: any) {}

	private bumpUpdateDate() {
		this.updatedAt = new Date()
	}

	get id(): any | undefined {
		if (!this._id) {
			throw new Error("AggregateRoot: id is undefined")
		}

		return this._id
	}
}