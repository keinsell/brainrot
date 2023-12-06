import {JsonWebToken} from "../domain/value-objects/jsonwebtoken.js"
import {JwtPayload}   from "../domain/value-objects/jwt-payload.js"



export abstract class TokenManagement {
	abstract signAccessToken(payload: JsonWebToken): Promise<string>


	abstract signRefreshToken(payload: JsonWebToken): Promise<string>


	abstract verifyToken(token: string): Promise<boolean>


	abstract decodeToken<T = JwtPayload>(token: string): Promise<T>
}
