// TODO: https://linear.app/keinsell/issue/PROD-95/add-entity-base-class
import {EventBus}   from "../../../infrastructure/messaging/event-bus.js"
import {Repository} from "../../storr/repository/repository.js"



export class EntityBase {
	private _updatedAt: Date
	private _createdAt: Date
	private _version: number = 1
	private _singularName?: string
	private _pluralName?: string
	private forwardRefName?: string

	/**
	 * Array that holds events data.
	 *
	 * @type {Array<any>}
	 */
	private _events: Array<{ state: "PENDING" | "COMMITTED", event: any }> = []


	/** Commits changes done on specific entity to the repository and publishes changes to other modules. */
	public async commit(repository: Repository<this>, bus?: EventBus): Promise<void> {

		this.bumpVersion()
		this.bumpUpdateDate()

		await repository.save(this)

		if (!bus) {
			console.warn("Event bus is not provided. Events will not be published.")
			return
		}

		await bus.publishAll(this.getPendingEvents())
	}


	/**
	 * Retrieves the uncommitted events.
	 *
	 * @returns {Array} An array containing the uncommitted events.
	 */
	public getPendingEvents() {
		const eventsSnapshot = this._events.slice()

		// Remove events from aggregate as we already have a copy of them.
		this._events = []

		// Filter snapshot to only include pending events.
		return eventsSnapshot.filter((event) => event.state === "PENDING")
	}


	/** Handle command in reflection-based method which will search an inter-class references for specific command and execute method basing on information from command. This method is used to handle commands in aggregates. */
	public handleCommand(command: any) {
		throw new Error("Method not implemented." + command)
	}


	protected bumpVersion() {
		this._version = this._version + 1
	}


	protected appendEvent(event: any) {
		this._events.push({
			state: "PENDING",
			event,
		})
	}


	private bumpUpdateDate() {
		this._updatedAt = new Date()
	}
}