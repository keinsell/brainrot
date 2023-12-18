import {Injectable, Logger}         from "@nestjs/common"
import {PassportStrategy}           from "@nestjs/passport"
import e                            from "express"
import {ExtractJwt, Strategy}       from "passport-jwt"
import {authorizationConfiguration} from "../../../../configs/authorization-configuration.js"
import {AuthenticationStrategyType} from "../../utils/authentication-strategy-type.js"
import {AuthenticationStrategy}     from "../authentication-strategy.js"



@Injectable()
export class JwtAuthorizationStrategy extends PassportStrategy(Strategy, AuthenticationStrategyType.JWT)
	implements AuthenticationStrategy {
	private logger: Logger = new Logger("authorization::strategy::jwt")


	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey:    authorizationConfiguration.jwtSecret,
		});
	}


	async validate(payload: unknown): Promise<any> {
		this.logger.verbose(`User "${payload}"..."`)

		// TODO: Fetch profile associated with token
		// TODO: Fetch session associated with token
		// TODO: Check if session is valid (not blacklisted and existing)
		// TODO: Return User to middleware

		throw Error("Not implemented")
	}


	public authenticate(req: e.Request, options?: any): void {
		this.logger.log(req.headers.authorization)
		// TODO: Get token from request
		// TODO: Get Secret Key
		// TODO: Verify token
	}
}