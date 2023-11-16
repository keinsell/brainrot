import {
	CredentialValidatorModule,
}                       from "@boundary/identity-and-access/account/shared-kernel/credential-validator/credential-validator-module.js"
import {
	AuthenticationController,
}                       from "@boundary/identity-and-access/authentication/application/authentication-controller.js"
import {
	AuthenticationService,
}                       from "@boundary/identity-and-access/authentication/services/authentication-service.js"
import {
	LocalAuthorizationStrategy,
}                       from "@boundary/identity-and-access/authentication/services/authorization-strategies/local-authorization-strategy.js"
import {
	TokenManagement,
}                       from "@boundary/identity-and-access/authentication/services/token-management.js"
import {
	JwtTokenManagement,
}                       from "@boundary/identity-and-access/authentication/services/token-management/jwt.token-management.js"
import {
	AuthenticationGuard,
}                       from "@boundary/identity-and-access/authentication/shared-kernel/guards/authentication-guard.js"
import {Module}         from "@nestjs/common"
import {JwtModule}      from "@nestjs/jwt"
import {PassportModule} from "@nestjs/passport"
import {
	authorizationConfiguration,
}                       from "../../../configs/authorization-configuration.js"



@Module({
	imports:   [
		CredentialValidatorModule,
		JwtModule.register({
			// TODO: Use it as Async Module with ConfigService
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
	providers: [AuthenticationService, AuthenticationGuard, LocalAuthorizationStrategy, {provide: TokenManagement, useClass: JwtTokenManagement}],
	exports:   [AuthenticationService, AuthenticationGuard],
})
export class AuthenticationModule {}