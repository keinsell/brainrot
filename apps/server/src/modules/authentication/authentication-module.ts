import {Module}                     from '@nestjs/common'
import {JwtModule}                  from '@nestjs/jwt'
import {PassportModule}             from '@nestjs/passport'
import {DatabaseModule}             from '../../common/modules/database/database.module.js'
import {__authConfig}               from '../../configs/global/__config.js'
import {AccountModule}              from '../account/account.module.js'
import {CredentialValidatorModule}  from '../account/shared-kernel/credential-validator/credential-validator-module.js'
import {AuthtokenModule}            from '../authtoken/authtoken-module.js'
import {
	JwtTokenManagement,
	TokenManagement,
}                                   from '../authtoken/token-management.js'
import {PrismaSessionRepository}    from '../session/repositories/prisma-session-repository.js'
import {SessionRepository}          from '../session/repositories/session-repository.js'
import {SessionModule}              from '../session/session.module.js'
import {AuthenticationController}   from './controllers/authentication-controller.js'
import {
	JwtAuthorizationStrategy,
	LocalAuthorizationStrategy,
}                                   from './provider/authorization-strategy/index.js'
import {LocalAuthenticationService} from './services/local-authentication-service.js'



@Module({
	        imports    : [
		        CredentialValidatorModule,
		        AccountModule,
		        AuthtokenModule,
		        PassportModule.register({
			                                session: true,
		                                }),
		        DatabaseModule,
		        JwtModule.register({
			                           secretOrPrivateKey: __authConfig.JWT_SECRET,
		                           }),
		        SessionModule,
	        ],
	        controllers: [AuthenticationController],
	        providers  : [
		        LocalAuthenticationService,
		        LocalAuthorizationStrategy,
		        JwtAuthorizationStrategy,
		        {
			        provide : SessionRepository,
			        useClass: PrismaSessionRepository,
		        },
		        {
			        provide : TokenManagement,
			        useClass: JwtTokenManagement,
		        },

	        ],
	        exports    : [LocalAuthenticationService],
        })
export class AuthenticationModule {
}