import {Module}                     from "@nestjs/common"
import {JwtModule}                  from "@nestjs/jwt"
import {PassportModule}             from "@nestjs/passport"
import {authorizationConfiguration} from "../../../configs/authorization-configuration.js"
import {AuthenticationService}      from "./services/authentication-service.js"
import {LocalAuthorizationStrategy} from "./services/authorization-strategies/local-authorization-strategy.js"
import {AuthenticationGuard}        from "./services/guards/authentication-guard.js"



@Module({
	imports:   [
		// TODO: Use it as Async Module with ConfigService
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
	providers: [AuthenticationService, AuthenticationGuard, LocalAuthorizationStrategy],
	exports:   [AuthenticationService, PassportModule, JwtModule, AuthenticationGuard],
})
export class AuthenticationModule {}