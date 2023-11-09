import {CredentialValidatorModule}  from "@iam/account/shared-kernel/credential-validator/credential-validator-module.js"
import {AuthenticationService}      from "@iam/authentication/services/authentication-service.js"
import {LocalAuthorizationStrategy} from "@iam/authentication/services/authorization-strategies/local-authorization-strategy.js"
import {AuthenticationGuard}        from "@iam/authentication/shared-kernel/guards/authentication-guard.js"
import {Module}                     from "@nestjs/common"
import {JwtModule}                  from "@nestjs/jwt"
import {PassportModule}             from "@nestjs/passport"
import {authorizationConfiguration} from "../../../configs/authorization-configuration.js"



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
	providers: [AuthenticationService, AuthenticationGuard, LocalAuthorizationStrategy],
	exports:   [AuthenticationService, PassportModule, JwtModule, AuthenticationGuard],
})
export class AuthenticationModule {}