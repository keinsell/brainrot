import {
  Injectable,
  Logger,
}                            from '@nestjs/common'
import { randomUUID }      from 'node:crypto'
import { ServiceAbstract } from '../../../kernel/libraries/services/service-abstract.js'
import { EventBus }        from '../../../kernel/modules/messaging/event-bus.js'
import { CreateSession }   from '../commands/create-session.js'
import { UserSession }       from '../entities/user-session.js'
import { SessionRepository } from '../repositories/session-repository.js'



@Injectable()
export class SessionService
  extends ServiceAbstract<UserSession>
  {
	 private logger : Logger = new Logger( 'session::service' )

	 constructor(
		private sessionRepository : SessionRepository,
		private eventbus : EventBus,
	 )
		{
		  super( sessionRepository )
		}

	 public async startSession(payload : CreateSession) : Promise<UserSession>
		{
		  const session = UserSession.build( {
															...payload,
															id        : randomUUID(),
															startTime : new Date(),
														 } )

		  session.startSession()

		  const events = session.getUncommittedEvents()

		  await this.eventbus.publishAll( events )

		  return this.sessionRepository.create( session )
		}

	 public async refreshSession(
		session : UserSession,
		accessTokenJti : string,
	 ) : Promise<UserSession>
		{
		  session.refreshSession( accessTokenJti )

		  const events = session.getUncommittedEvents()

		  this.eventbus.publishAll( events )

		  return this.sessionRepository.update( session )
		}

	 public async getByJti(jti : string) : Promise<UserSession>
		{
		  return this.sessionRepository.getByJti( jti )
		}
  }