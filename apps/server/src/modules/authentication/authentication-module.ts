import {Module}                              from "@nestjs/common"
import {JwtModule}                           from "@nestjs/jwt"
import {PassportModule}                      from "@nestjs/passport"
import {DatabaseModule}                      from "../../common/modules/storage/database/database.module.js"
import {authorizationConfiguration}          from "../../configs/authorization-configuration.js"
import {AccountModule}                       from "../account/account.module.js"
import {CredentialValidatorModule}           from "../account/shared-kernel/credential-validator/credential-validator-module.js"
import {SessionModule}                       from "../session/session.module.js"
import {AuthenticationController}            from "./controllers/authentication-controller.js"
import {PrismaSessionRepository}             from "./repositories/prisma-session-repository.js"
import {SessionRepository}                   from "./repositories/session-repository.js"
import {AuthenticationService}               from "./services/authentication-service.js"
import {JwtAuthorizationStrategy}            from "./services/authorization-strategies/jwt-authorization-strategy.js"
import {LocalAuthorizationStrategy}          from "./services/authorization-strategies/local-authorization-strategy.js"
import {JwtTokenManagement, TokenManagement} from "./services/token-management.js"



@Module({
	imports:     [
		CredentialValidatorModule, AccountModule, PassportModule.register({
			session: true,
		}), DatabaseModule, JwtModule.register({
			secretOrPrivateKey: authorizationConfiguration.jwtSecret,
		}), SessionModule,
	],
	controllers: [AuthenticationController],
	providers:   [
		AuthenticationService, LocalAuthorizationStrategy, JwtAuthorizationStrategy, {
			provide:  SessionRepository,
			useClass: PrismaSessionRepository,
		}, {
			provide:  TokenManagement,
			useClass: JwtTokenManagement,
		},
	],
	exports:     [AuthenticationService],
})
export class AuthenticationModule {
}