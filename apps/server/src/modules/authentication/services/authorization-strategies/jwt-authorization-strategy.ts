import {Injectable, Logger}         from "@nestjs/common"
import {PassportStrategy}           from "@nestjs/passport"
import e                            from "express"
import jwt                          from 'jsonwebtoken';
import {ExtractJwt, Strategy}       from "passport-jwt"
import {authorizationConfiguration} from "../../../../configs/authorization-configuration.js"
import {AccountService}             from "../../../account/services/account-service.js"
import {AuthenticationStrategyType} from "../../utils/authentication-strategy-type.js"
import {JwtPayload}                 from "../../value-objects/jwt-payload.js"
import {AuthenticationStrategy}     from "../authentication-strategy.js"



@Injectable()
export class JwtAuthorizationStrategy extends PassportStrategy(Strategy, AuthenticationStrategyType.JWT)
	implements AuthenticationStrategy {
	private logger: Logger = new Logger("authorization::strategy::jwt")


	constructor(
		private accountService: AccountService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey:    authorizationConfiguration.jwtSecret,
		});
	}


	async validate(payload: JwtPayload): Promise<any> {
		this.logger.verbose(`Request performed using jwt_${payload.jti} for user ${payload.sub}`)

		// Fetch profile associated with token
		const account = await this.accountService.getById(payload.sub)

		// TODO: Fetch session associated with token
		// TODO: Check if session is valid (not blacklisted and existing)
		// TODO: Return User to middleware

		return account
	}


	public _authenticate(req: e.Request, options?: any): void {
		this.logger.log(req.headers.authorization)

		// TODO: Get token from request
		// Get token from request
		let token = null;

		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token) {
			throw new Error("Token not found");
		}


		// TODO: Get Secret Key
		const secretKey = authorizationConfiguration.jwtSecret;


		// TODO: Verify token

		// Verify token
		jwt.verify(token, secretKey, (err: unknown, decoded: unknown) => {
			if (err) {
				this.logger.error(err);
				throw new Error("Invalid token");
			}
			// if token verifies successfully, the decoded payload will be the returned value
			console.log(decoded);
		});
	}
}