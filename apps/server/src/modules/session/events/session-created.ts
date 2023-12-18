import {Event}   from "../../../common/_unknown_lib/message/event.js"
import {Session} from "../entities/session.js"



export class SessionCreated extends Event {
	public static readonly type = "SessionCreated"
	public readonly payload: Session


	constructor(session: Session) {
		super({
			namespace: "session.created",
			body:      session,
		})
		this.payload = session
	}
}