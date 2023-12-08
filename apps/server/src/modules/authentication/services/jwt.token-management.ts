import {Injectable, Logger}         from "@nestjs/common"
import {JwtService}                 from "@nestjs/jwt"
import {authorizationConfiguration} from "../../../configs/authorization-configuration.js"
import {censorString}               from "../../../utilities/console-utils/censor-string.js"
import {TokenManagement}            from "../domain/services/token-management.js"
import {JsonWebToken}               from "../domain/value-objects/jsonwebtoken.js"



@Injectable()
export class JwtTokenManagement extends TokenManagement {
	private logger: Logger = new Logger("authentication::jwt")


	constructor(private readonly jwtService: JwtService) {
		super()
	}


	public async decodeToken(token: string): Promise<any> {
		const decodedToken = await this.jwtService.decode(token, {complete: true})
		this.logger.debug(`Decoded token ${censorString(token)}...: ${JSON.stringify(decodedToken)}`)
		return decodedToken
	}


	public async signAccessToken(payload: JsonWebToken): Promise<string> {
		payload.setExpriationTime(Date.now() + authorizationConfiguration.accessTokenExpirationTime)

		const accessToken = await this.jwtService.signAsync(payload.toPlainObject(), {secret: authorizationConfiguration.jwtSecret})

		this.logTokenGeneration(payload, accessToken)

		return accessToken
	}


	public async signRefreshToken(payload: JsonWebToken): Promise<string> {
		payload.setExpriationTime(Date.now() + authorizationConfiguration.refreshTokenExpirationTime)

		const refreshToken = await this.jwtService.signAsync(payload.toPlainObject(), {secret: authorizationConfiguration.jwtSecret})

		this.logTokenGeneration(payload, refreshToken)

		return refreshToken
	}


	public verifyToken(token: string): Promise<any> {
		return Promise.resolve(undefined)
	}


	private logTokenGeneration(payload: JsonWebToken, token: string): void {
		this.logger.debug(`Generated jsonwebtoken from provided payload ${JSON.stringify(payload)} | ${censorString(token)}`)
		this.logger.log(`Generated jsonwebtoken with ID ${payload.jti}`)
	}
}