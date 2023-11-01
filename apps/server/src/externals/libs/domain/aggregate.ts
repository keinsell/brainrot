// TODO: https://linear.app/keinsell/issue/PROD-93/add-aggregate-root-base-class
export class AggregateRoot<T extends Object = {}> {
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
		this.setVersion(this.getVersion() + 1)
	}


	/**
	 * Retrieves the version of the object.
	 *
	 * @returns {string} The version of the object.
	 */
	protected getVersion() {
		return this._version
	}


	/**
	 * Sets the version for the object.
	 *
	 * @param {number} version - The version to be set.
	 *
	 * @return {undefined}
	 */
	protected setVersion(version: number) {
		this._version = version
	}


	/**
	 * Executes a command with the given parameters.
	 *
	 * @param {any} command - The command to be executed.
	 *
	 * @return {void}
	 */
	protected executeCommand(command: any) {}
}