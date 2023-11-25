import {JsonWebToken} from "@boundary/identity-and-access/modules/authentication/domain/value-objects/jsonwebtoken.js"
import {JwtPayload}   from "@boundary/identity-and-access/modules/authentication/domain/value-objects/jwt-payload.js"



export abstract class TokenManagement {
	abstract signAccessToken(payload: JsonWebToken): Promise<string>


	abstract signRefreshToken(payload: JsonWebToken): Promise<string>


	abstract verifyToken(token: string): Promise<boolean>


	abstract decodeToken<T = JwtPayload>(token: string): Promise<T>
}
