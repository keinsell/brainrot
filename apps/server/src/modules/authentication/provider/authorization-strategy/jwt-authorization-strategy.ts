import {Injectable, Logger}         from "@nestjs/common"
import {PassportStrategy}           from "@nestjs/passport"
import {ExtractJwt, Strategy}       from "passport-jwt"
import {authorizationConfiguration} from "../../../../configs/authorization-configuration.js"
import {AccountService}             from "../../../account/services/account-service.js"
import {AuthenticationStrategyType} from "../../contract/authentication-strategy/authentication-strategy-type.js"
import {JwtPayload}                 from "../../value-objects/jwt-payload.js"
import {AuthenticationStrategy}     from "../../contract/authentication-strategy/authentication-strategy.js"



@Injectable()
export class JwtAuthorizationStrategy
	extends PassportStrategy(Strategy, AuthenticationStrategyType.JWT)
	implements AuthenticationStrategy {
	private logger : Logger = new Logger("authorization::strategy::jwt")


	constructor(private accountService : AccountService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey   : authorizationConfiguration.jwtSecret,
		});
	}


	async validate(payload : JwtPayload) : Promise<any> {
		this.logger.verbose(`Request performed using jwt_${payload.jti} for user ${payload.sub}`)

		// Typeguard against missing sub
		if (!payload.sub) {
			throw new Error("Invalid token payload");
		}

		// Fetch profile associated with token
		const account = await this.accountService.getById(payload.sub)

		// TODO: Fetch session associated with token
		// TODO: Check if session is valid (not blacklisted and existing)
		// TODO: Return User to middleware

		return account
	}
}