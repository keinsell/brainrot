import {Event}               from "../../../common/libraries/message/event.js";
import {AuthenticationToken} from "../entity/authentication-token.js";



export class AuthenticationTokenExpired
	extends Event<AuthenticationToken> {
	constructor(authenticationToken : AuthenticationToken) {
		super({
			namespace: "authentication_token.expired",
			body     : authenticationToken,
		})
	}
}