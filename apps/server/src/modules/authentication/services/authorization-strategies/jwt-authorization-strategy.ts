import {Injectable}                 from "@nestjs/common"
import {PassportStrategy}           from "@nestjs/passport"
import {ExtractJwt, Strategy}       from "passport-jwt"
import {authorizationConfiguration} from "../../../../configs/authorization-configuration.js"



@Injectable()
export class JwtAuthorizationStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest:   ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey:      authorizationConfiguration.jwtSecret,
		});
	}


	async validate(payload: any) {
		return {
			userId:   payload.sub,
			username: payload.username,
		};
	}
}