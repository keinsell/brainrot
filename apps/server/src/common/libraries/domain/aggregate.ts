import {Logger}     from "@nestjs/common"
import {randomUUID} from "node:crypto"



export interface AggregateRootProperties {
	id?: any | undefined
	createdAt?: Date
	updatedAt?: Date
}


// TODO: https://linear.app/keinsell/issue/PROD-93/add-aggregate-root-base-class
export class AggregateRoot<T extends Object = {}> implements AggregateRootProperties {
	public readonly createdAt: Date
	protected logger: Logger
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


	constructor(aggregateBaseProperties: Partial<AggregateRootProperties>) {
		this._id       = aggregateBaseProperties.id || randomUUID()
		this.createdAt = new Date()
		this.updatedAt = new Date()
		this.logger    = new Logger(this.constructor.name.toLowerCase() + `::${this.id}`)
	}


	private _id: any | undefined;

	get id(): any | undefined {
		return this._id
	}


	//private _stateMachine: StateMachine<T>

	public updatedAt: Date


	/**
	 * Retrieves the uncommitted events.
	 *
	 * @returns {Array} An array containing the uncommitted events.
	 */
	public getUncommittedEvents() {
		const eventsSnapshot = this._events.slice()
		// Remove events from aggregate as we already have a copy of them.
		this._events         = []
		return eventsSnapshot
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
}