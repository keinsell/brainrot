import {Injectable}                 from "@nestjs/common"
import {PassportStrategy}           from "@nestjs/passport"
import {ExtractJwt, Strategy}       from "passport-jwt"
import {authorizationConfiguration} from "../../../../configs/authorization-configuration.js"



@Injectable()
export class JwtAuthorizationStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor() {
		super({
			jwtFromRequest:    ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration:  true,
			secretOrKey:       authorizationConfiguration.jwtSecret,
			passReqToCallback: true,
		});
	}


	async validate(payload: any) {
		console.log('validate')
		console.log(payload)

		return {
			userId:   payload.sub,
			username: payload.username,
		};
	}
}