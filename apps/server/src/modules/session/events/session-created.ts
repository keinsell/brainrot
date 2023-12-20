import {Event}       from "../../../common/libraries/message/event.js"
import {UserSession} from "../entities/user-session.js"



export class SessionCreated extends Event {
	public static readonly type = "SessionCreated"
	public readonly payload: UserSession


	constructor(session: UserSession) {
		super({
			namespace: "session.created",
			body:      session,
		})
		this.payload = session
	}
}