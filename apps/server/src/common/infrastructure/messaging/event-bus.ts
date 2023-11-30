import {Event}   from "../../libraries/message/event.js"
import {Message} from "../../libraries/message/message.js"



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


export abstract class EventBusBase {
	private messageBus: MessageBusBase


	constructor(
		messageBus: MessageBusBase,
	) {
		this.messageBus = messageBus
	}


	public async publish(event: Event): Promise<void> {
		await this.messageBus.publish(event)
	}


	publishAll(events: any[]): Promise<void> {
		return this.messageBus.publishAll(events)
	}
}


// TODO: Can have outbox pattern here
export abstract class MessageBusBase {
	constructor() {}


	abstract publish(message: Message): Promise<void>


	async publishAll(messages: Message[]) {
		for (const message of messages) {
			await this.publish(message)
		}
	}
}