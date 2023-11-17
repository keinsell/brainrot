import {
	Session,
}                   from "@boundary/identity-and-access/authentication/domain/entities/session.js"
import {Event}      from "@libraries/message/event.js"
import {randomUUID} from "node:crypto"



export class SessionCreated extends Event {
	public static readonly type = "SessionCreated"
	public readonly type = SessionCreated.type
	public readonly payload: Session

	constructor(session: Session) {
		super(randomUUID())
		this.payload = session
	}
}