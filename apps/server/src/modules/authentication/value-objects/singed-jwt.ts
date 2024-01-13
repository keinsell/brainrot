import {JsonWebToken} from "../../authtoken/entity/jsonwebtoken.js"



export class SingedJwt
	extends JsonWebToken {
	constructor(
		jwt : JsonWebToken,
		public signature : string,
	)
	{
		super(
			jwt.toPlainObject(),
		)
	}
}