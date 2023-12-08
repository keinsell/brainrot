import {JsonWebToken} from "../value-objects/jsonwebtoken.js"
import {JwtPayload}   from "../value-objects/jwt-payload.js"
import {AccessToken}  from "../value-objects/tokens/access-token.js"
import {RefreshToken} from "../value-objects/tokens/refresh-token.js"



export abstract class TokenManagement {
	abstract create(payload: JwtPayload): Promise<JsonWebToken | RefreshToken | AccessToken>


	abstract sign(payload: JsonWebToken | RefreshToken | AccessToken): Promise<string>


	abstract verify(token: string): Promise<boolean>


	abstract decode<T = JwtPayload>(token: string): Promise<T>
}