import {Injectable, Logger}         from "@nestjs/common"
import {PassportStrategy}           from "@nestjs/passport"
import {ExtractJwt, Strategy}       from "passport-jwt"
import {authorizationConfiguration} from "../../../../configs/authorization-configuration.js"
import {AuthenticationStrategy}     from "../../domain/services/authentication-strategy.js"



@Injectable()
export class JwtAuthorizationStrategy extends PassportStrategy(Strategy, "jwt") implements AuthenticationStrategy {
	private logger: Logger = new Logger("authorization::strategy::jwt")


	constructor() {
		super({
			jwtFromRequest:   ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey:      authorizationConfiguration.jwtSecret,
		});
	}


	async validate(payload: any) {
		this.logger.log("Validating:")
		this.logger.log("Validating:")
		this.logger.log("Validating:")
		this.logger.log("Validating:")
		this.logger.log("Validating:")
		this.logger.log("Validating:")

		return {
			userId:   payload.sub,
			username: payload.username,
		};
	}
}