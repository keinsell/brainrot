import {Injectable, Logger} from "@nestjs/common"
import {randomUUID}         from "node:crypto"
import {EventBus}           from "../../../common/infrastructure/messaging/event-bus.js"
import {ServiceAbstract}    from "../../../common/libraries/services/service-abstract.js"
import {CreateSession}      from "../commands/create-session.js"
import {Session}            from "../entities/session.js"
import {SessionRepository}  from "../repositories/session-repository.js"



@Injectable()
export class SessionService extends ServiceAbstract<Session> {
	private logger: Logger = new Logger("session::service")

	constructor(
		private sessionRepository: SessionRepository,
		private eventbus: EventBus,
	) {super(
		sessionRepository,
	)}

	public async startSession(payload: CreateSession): Promise<Session> {
		const session = Session.build({
			...payload,
			id: randomUUID(),
			startTime: new Date(),
		})

		session.startSession()

		const events = session.getUncommittedEvents()

		await this.eventbus.publishAll(events)

		return this.sessionRepository.create(session)
	}

	public async refreshSession(session: Session, accessTokenJti: string): Promise<Session> {
		session.refreshSession(accessTokenJti)

		const events = session.getUncommittedEvents()

		this.eventbus.publishAll(events)

		return this.sessionRepository.update(session)
	}

	public async getByJti(jti: string): Promise<Session> {
		return this.sessionRepository.getByJti(jti)
	}
}