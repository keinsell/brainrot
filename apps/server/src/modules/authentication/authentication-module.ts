import {Module}                     from "@nestjs/common"
import {JwtModule}                  from "@nestjs/jwt"
import {PassportModule}             from "@nestjs/passport"
import {DatabaseModule}             from "../../common/infrastructure/storage/database/database.module.js"
import {authorizationConfiguration} from "../../configs/authorization-configuration.js"
import {CredentialValidatorModule}  from "../account/shared-kernel/credential-validator/credential-validator-module.js"
import {AuthenticationController}   from "./controllers/authentication-controller.js"
import {PrismaSessionRepository}    from "./repositories/prisma-session-repository.js"
import {SessionRepository}          from "./repositories/session-repository.js"
import {AuthenticationService}      from "./services/authentication-service.js"
import {JwtAuthorizationStrategy}   from "./services/authorization-strategies/jwt-authorization-strategy.js"
import {LocalAuthorizationStrategy} from "./services/authorization-strategies/local-authorization-strategy.js"



@Module({
	imports:     [
		CredentialValidatorModule, PassportModule.register({
			session: false,
		}), DatabaseModule, JwtModule.register({
			secret:      authorizationConfiguration.jwtSecret,
			signOptions: {expiresIn: '1h'},
		}),
	],
	controllers: [AuthenticationController],
	providers:   [
		AuthenticationService, LocalAuthorizationStrategy, JwtAuthorizationStrategy, {
			provide:  SessionRepository,
			useClass: PrismaSessionRepository,
		},
	],
	exports:     [AuthenticationService],
})
export class AuthenticationModule {
}