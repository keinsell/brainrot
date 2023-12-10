import {EmailMessage} from "./email-message.js"



export abstract class Mailer {
	abstract send(email: EmailMessage): Promise<void>
}