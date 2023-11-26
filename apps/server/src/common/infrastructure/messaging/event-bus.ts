export class EventBus {
	async publish(event: any) {
		console.log(event)
	}


	async publishAll(events: any[]) {
		for (const event of events) {
			await this.publish(event)
		}
	}
}