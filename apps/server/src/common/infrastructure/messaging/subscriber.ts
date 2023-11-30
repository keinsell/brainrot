import {Message}     from "../../_unknown_lib/message/message.js"
import {HandlerBase} from "./handler.js"



export class SubscriberBase<T extends Message> {
	private handler: HandlerBase<T>


	constructor(handler: HandlerBase<T>) {
		this.handler = handler
	}
}