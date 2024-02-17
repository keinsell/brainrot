import {Event}                 from "../../../common/libraries/message/event.js";
import {AuthenticationToken}   from "../entity/authentication-token.js";
import {AuthenticationTokenId} from "../value-object/authentication-token-id.js";



export class AuthenticationTokenRevoked
	extends Event<{ id : AuthenticationTokenId }> {
	constructor(authenticationToken : AuthenticationToken) {
		super({
			namespace: "authentication_token.revoked",
			body     : {id: authenticationToken.id},
		})
	}
}