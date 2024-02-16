import {Module}                    from '@nestjs/common'
import {JwtModule}                 from '@nestjs/jwt'
import {__authConfig}              from '../../conf/global/__config.js'
import {AuthtokenModule}           from '../authtoken/authtoken-module.js'
import {SessionController}         from './controllers/session-controller.js'
import {InMemorySessionRepository} from './repositories/in-memory.session-repository.js'
import {SessionRepository}         from './repositories/session-repository.js'
import {SessionService}            from './services/session-service.js'



@Module({
	imports:     [
		JwtModule.register({
			secretOrPrivateKey: __authConfig.JWT_SECRET,
		}), AuthtokenModule,
	],
	controllers: [SessionController],
	providers:   [
		SessionService, {
			provide:  SessionRepository,
			useClass: InMemorySessionRepository,
		},
	],
	exports:     [SessionService],
})
export class SessionModule {
}