export interface TokenOptions {
	expiresIn: string
}


export abstract class TokenManagement {
	abstract generateToken(payload: any, options?: TokenOptions): Promise<string>


	abstract verifyToken(token: string): Promise<any>


	abstract decodeToken(token: string): Promise<any>
}