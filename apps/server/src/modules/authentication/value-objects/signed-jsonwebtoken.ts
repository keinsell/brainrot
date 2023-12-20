import {JsonWebToken} from "./jsonwebtoken.js"



export class SignedJsonwebtoken extends JsonWebToken {
	constructor(
		jwt: JsonWebToken,
		public signature: string,
	) {super(
jwt.toPlainObject(),
	)
	}
}