import {Session}    from "@boundary/identity-and-access/modules/authentication/domain/entities/session.js"
import {randomUUID} from "node:crypto"
import {Event}      from "../../../../../../common/_unknown_lib/message/event.js"



export class SessionCreated extends Event {
	public static readonly type = "SessionCreated"
	public readonly type        = SessionCreated.type
	public readonly payload: Session


	constructor(session: Session) {
		super(randomUUID())
		this.payload = session
	}
}