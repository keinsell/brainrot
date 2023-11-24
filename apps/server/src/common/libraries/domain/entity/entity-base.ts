// TODO: https://linear.app/keinsell/issue/PROD-95/add-entity-base-class
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
	public async commit(repository: any, bus: any): Promise<void> {
		await repository.save(this)
		await bus.publish(this.getPendingEvents())
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


	protected bumpVersion() {
		this._version = this._version + 1
	}


	private bumpUpdateDate() {
		this._updatedAt = new Date()
	}
}