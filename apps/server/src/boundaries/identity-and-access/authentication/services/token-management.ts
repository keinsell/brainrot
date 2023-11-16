export interface TokenOptions {
	expiresIn: string
}


export abstract class TokenManagement {
	abstract generateAccessToken(payload: any): Promise<string>
	abstract generateRefreshToken(payload: any): Promise<string>
	abstract verifyToken(token: string): Promise<any>
	abstract decodeToken<T = unknown>(token: string): Promise<T>
}