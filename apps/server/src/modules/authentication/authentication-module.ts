import {Module}                     from "@nestjs/common"
import {JwtModule}                  from "@nestjs/jwt"
import {PassportModule}             from "@nestjs/passport"
import {DatabaseModule}             from "../../common/infrastructure/storage/database/database.module.js"
import {authorizationConfiguration} from "../../configs/authorization-configuration.js"
import {CredentialValidatorModule}  from "../account/shared-kernel/credential-validator/credential-validator-module.js"
import {AuthenticationController}   from "./application/authentication-controller.js"
import {SessionRepository}          from "./domain/repositories/session-repository.js"
import {AuthenticationService}      from "./domain/services/authentication-service.js"
import {TokenManagement}            from "./domain/services/token-management.js"
import {PrismaSessionRepository}    from "./infrastructure/prisma-session-repository.js"
import {JwtAuthorizationStrategy}   from "./services/authorization-strategies/jwt-authorization-strategy.js"
import {LocalAuthorizationStrategy} from "./services/authorization-strategies/local-authorization-strategy.js"
import {JwtTokenManagement}         from "./services/jwt.token-management.js"



@Module({
	imports:     [
		CredentialValidatorModule, JwtModule.register({
			global: false,
			secret: authorizationConfiguration.jwtSecret,
		}), PassportModule.register({
			defaultStrategy: "jwt",
			session:         false,
		}), DatabaseModule,
	],
	controllers: [AuthenticationController],
	providers:   [
		AuthenticationService, LocalAuthorizationStrategy, JwtAuthorizationStrategy, {
			provide:  TokenManagement,
			useClass: JwtTokenManagement,
		}, {
			provide:  SessionRepository,
			useClass: PrismaSessionRepository,
		},
	],
	exports:     [AuthenticationService],
})
export class AuthenticationModule {
}