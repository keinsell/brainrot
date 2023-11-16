import {
	TokenManagement,
}                           from "@boundary/identity-and-access/authentication/services/token-management.js"
import {Injectable, Logger} from "@nestjs/common"
import {JwtService}         from "@nestjs/jwt"
import {
	authorizationConfiguration,
}                           from "../../../../../configs/authorization-configuration.js"



@Injectable()
export class JwtTokenManagement extends TokenManagement {
	private logger: Logger = new Logger("authentication::jwt")
	constructor(private readonly jwtService: JwtService) {
		super()
	}

	public async decodeToken(token: string): Promise<any> {
		const decodedToken = await this.jwtService.decode(token, {complete: true})

		this.logger.debug(`Decoded token ${token.slice(0, 10)}...: ${JSON.stringify(decodedToken)}`)

		return decodedToken
	}


	public async  generateAccessToken(payload: any): Promise<string> {
		const accessToken =	await this.jwtService.signAsync(payload, {secret: authorizationConfiguration.jwtSecret})

		this.logger.debug(`Generated access token ${accessToken.slice(0, 10)}...: ${JSON.stringify(payload)}`)

		return accessToken
	}


	public generateRefreshToken(payload: any): Promise<string> {
		return Promise.resolve("")
	}


	public verifyToken(token: string): Promise<any> {
		return Promise.resolve(undefined)
	}
}