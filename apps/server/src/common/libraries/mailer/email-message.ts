import {EmailAddress}    from "./email-address.js"
import {EmailAttachment} from "./email-attachment.js"
import {Html}            from "./html.js"
import {PlainText}       from "./plain-text.js"



export interface EmailMessage {
	recipient: {
		to: EmailAddress
		cc?: EmailAddress[]
		bcc?: EmailAddress[]
	}
	sender?: {
		from: EmailAddress
		replyTo?: string
	}
	subject?: string
	body?: Html | PlainText
	attachments?: EmailAttachment[]
}


export class EmailMessage implements EmailMessage {
	attachments?: EmailAttachment[]
	body?: Html | PlainText
	recipient: {
		to: EmailAddress
		cc?: EmailAddress[]
		bcc?: EmailAddress[]
	}
	sender?: {
		from: EmailAddress
		replyTo?: string
	}
	subject?: string


	constructor(message: EmailMessage) {
		this.body        = message.body
		this.recipient   = message.recipient
		this.sender      = message.sender
		this.subject     = message.subject
		this.attachments = message.attachments
	}
}