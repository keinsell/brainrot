import {Module}                     from "@nestjs/common"
import {JwtModule, JwtService}      from "@nestjs/jwt"
import {PassportModule}             from "@nestjs/passport"
import {DatabaseModule}             from "../../common/infrastructure/storage/database/database.module.js"
import {authorizationConfiguration} from "../../configs/authorization-configuration.js"
import {CredentialValidatorModule}  from "../account/shared-kernel/credential-validator/credential-validator-module.js"
import {AuthenticationController}   from "./application/authentication-controller.js"
import {SessionRepository}          from "./domain/repositories/session-repository.js"
import {AuthenticationService}      from "./domain/services/authentication-service.js"
import {PrismaSessionRepository}    from "./infrastructure/prisma-session-repository.js"
import {JwtAuthorizationStrategy}   from "./services/authorization-strategies/jwt-authorization-strategy.js"
import {LocalAuthorizationStrategy} from "./services/authorization-strategies/local-authorization-strategy.js"



@Module({
	imports:     [
		CredentialValidatorModule, PassportModule.register({
			session: false,
		}), DatabaseModule, JwtModule.register({
			secret: authorizationConfiguration.jwtSecret,
		}),
	],
	controllers: [AuthenticationController],
	providers:   [
		AuthenticationService, LocalAuthorizationStrategy, JwtAuthorizationStrategy, {
			provide:  SessionRepository,
			useClass: PrismaSessionRepository,
		}, JwtService,
	],
	exports:     [AuthenticationService],
})
export class AuthenticationModule {
}