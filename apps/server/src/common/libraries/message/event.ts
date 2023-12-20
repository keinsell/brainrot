import {Message} from "./message.js"



export class Event<BODY = unknown> extends Message<BODY> {
	override type: "message" | "event" | "command" | "request" | "reply" | "query" = "event"


	constructor(payload: Omit<Message<BODY>, "id" | "timestamp" | "type">) {
		super(
			{
				...payload,
			},
		)
		Object.assign(this, payload)
		this.id = this.generateIdWithNamespace(this.type)
	}
}