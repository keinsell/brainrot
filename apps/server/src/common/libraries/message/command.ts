import {Message} from "./message.js"



export class Command extends Message {
	type: "message" | "event" | "command" | "request" | "reply" | "query" = "command"
}