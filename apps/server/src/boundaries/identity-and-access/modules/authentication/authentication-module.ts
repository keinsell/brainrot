import {CredentialValidatorModule}  from "@boundary/identity-and-access/modules/account/10-application/shared-kernel/credential-validator/credential-validator-module.js"
import {AuthenticationController}   from "@boundary/identity-and-access/modules/authentication/application/authentication-controller.js"
import {SessionRepository}          from "@boundary/identity-and-access/modules/authentication/domain/repositories/session-repository.js"
import {PrismaSessionRepository}    from "@boundary/identity-and-access/modules/authentication/infrastructure/prisma-session-repository.js"
import {AuthenticationService}      from "@boundary/identity-and-access/modules/authentication/services/authentication-service.js"
import {LocalAuthorizationStrategy} from "@boundary/identity-and-access/modules/authentication/services/authorization-strategies/local-authorization-strategy.js"
import {TokenManagement}            from "@boundary/identity-and-access/modules/authentication/services/token-management.js"
import {JwtTokenManagement}         from "@boundary/identity-and-access/modules/authentication/services/token-management/jwt.token-management.js"
import {Module}                     from "@nestjs/common"
import {JwtModule}                  from "@nestjs/jwt"
import {PassportModule}             from "@nestjs/passport"
import {DatabaseModule}             from "../../../../common/infrastructure/storage/database/database.module.js"
import {authorizationConfiguration} from "../../../../configs/authorization-configuration.js"



@Module({
	imports:     [
		CredentialValidatorModule,
		JwtModule.register({
			global:      true,
			secret:      authorizationConfiguration.jwtSecret,
		}), PassportModule.register({
			defaultStrategy: "jwt",
			session:         true,
			property:        "identity",
		}),
		DatabaseModule,
	],
	controllers: [AuthenticationController],
	providers:   [
		AuthenticationService, LocalAuthorizationStrategy,
		{
			provide:  TokenManagement,
			useClass: JwtTokenManagement,
		},
		{
			provide:  SessionRepository,
			useClass: PrismaSessionRepository,
		},
	],
	exports:     [AuthenticationService],
})
export class AuthenticationModule {}