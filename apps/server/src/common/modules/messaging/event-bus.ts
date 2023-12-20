import {Injectable, Logger} from "@nestjs/common"
import {EventEmitter2} from "@nestjs/event-emitter"
import {Event}         from "../../libraries/message/event.js"
import {Message}       from "../../libraries/message/message.js"



@Injectable()
export class EventBus {
	private logger: Logger = new Logger("event_bus")


	constructor(private eventEmitter: EventEmitter2) {}


	async publish(event: Event) {
		this.logger.verbose(`Publishing ${event.constructor.name} to namespace ${event.namespace} (${event.id}) => ${JSON.stringify(event)}`)
		this.eventEmitter.emit(event.namespace, event)
		this.logger.debug(`Published ${event.id} to ${event.namespace}`)
	}


	async publishAll(events: Event[]) {
		for (const event of events) {
			await this.publish(event)
		}
	}
}


export abstract class EventBusBase {
	private messageBus: MessageBusBase


	constructor(messageBus: MessageBusBase) {
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