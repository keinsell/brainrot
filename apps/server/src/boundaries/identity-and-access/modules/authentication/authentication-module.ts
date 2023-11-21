import {CredentialValidatorModule}  from "@boundary/identity-and-access/modules/account/10-application/shared-kernel/credential-validator/credential-validator-module.js"
import {AuthenticationController}   from "@boundary/identity-and-access/modules/authentication/application/authentication-controller.js"
import {AuthenticationService}      from "@boundary/identity-and-access/modules/authentication/services/authentication-service.js"
import {LocalAuthorizationStrategy} from "@boundary/identity-and-access/modules/authentication/services/authorization-strategies/local-authorization-strategy.js"
import {TokenManagement}            from "@boundary/identity-and-access/modules/authentication/services/token-management.js"
import {JwtTokenManagement}         from "@boundary/identity-and-access/modules/authentication/services/token-management/jwt.token-management.js"
import {Module}                     from "@nestjs/common"
import {JwtModule}                  from "@nestjs/jwt"
import {PassportModule}             from "@nestjs/passport"
import {authorizationConfiguration} from "../../../../configs/authorization-configuration.js"



@Module({
	imports:     [
		CredentialValidatorModule,
		JwtModule.register({
			global:      true,
			secret:      authorizationConfiguration.jwtSecret,
			signOptions: {
				expiresIn: authorizationConfiguration.accessTokenExpirationTime,
			},
		}), PassportModule.register({
			defaultStrategy: "jwt",
			session:         true,
			property:        "identity",
		}),
	],
	controllers: [AuthenticationController],
	providers:   [
		AuthenticationService, LocalAuthorizationStrategy,
		{
			provide:  TokenManagement,
			useClass: JwtTokenManagement,
		},
	],
	exports:     [AuthenticationService],
})
export class AuthenticationModule {}