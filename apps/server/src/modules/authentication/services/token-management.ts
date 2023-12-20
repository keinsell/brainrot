import {Injectable, Logger}         from "@nestjs/common"
import {JwtService, JwtSignOptions} from "@nestjs/jwt"
import {authorizationConfiguration} from "../../../configs/authorization-configuration.js"
import {JsonWebToken}               from "../value-objects/jsonwebtoken.js"
import {JwtPayload}                 from "../value-objects/jwt-payload.js"
import {SignedJsonwebtoken}         from "../value-objects/signed-jsonwebtoken.js"
import {AccessToken}                from "../value-objects/tokens/access-token.js"
import {RefreshToken}               from "../value-objects/tokens/refresh-token.js"



export abstract class TokenManagement {
	abstract create(payload: JwtPayload): Promise<JsonWebToken | RefreshToken | AccessToken>


	abstract sign(payload: JsonWebToken | RefreshToken | AccessToken): Promise<SignedJsonwebtoken>


	abstract verify(token: string): Promise<boolean>


	abstract decode<T = JwtPayload>(token: string): Promise<T>
}

@Injectable()
export class JwtTokenManagement extends TokenManagement {
	private logger: Logger = new Logger("token-management");
	private readonly jwtService: JwtService;
	private readonly options: JwtSignOptions;

	constructor(jwtService: JwtService) {
		super();
		this.jwtService = jwtService;
	}

	public async create(payload: JwtPayload): Promise<JsonWebToken | RefreshToken | AccessToken> {
		this.logger.verbose(`Creating token for payload: ${JSON.stringify(payload)}`)
		const tokenPayload = new JsonWebToken(payload);
		this.logger.verbose(`Created token payload: ${JSON.stringify(tokenPayload)}`)
		return tokenPayload;
	}

	public async decode<T = JwtPayload>(token: string): Promise<T> {
		this.logger.verbose(`Decoding token: ${token}`)
		const decoded = await this.jwtService.decode(token) as T;
		this.logger.verbose(`Decoded token: ${JSON.stringify(decoded)}`)
		return decoded;
	}

	public async sign(payload: JsonWebToken | RefreshToken | AccessToken): Promise<SignedJsonwebtoken> {
		this.logger.verbose(`Signing token: ${JSON.stringify(payload)}`)
		const signed = await this.jwtService.signAsync(payload.toPlainObject(), {secret: authorizationConfiguration.jwtSecret});
		this.logger.verbose(`Signed token: ${signed}`)
		this.logger.log(`Issued token ${payload.jti} for ${payload.sub}`)
		return new SignedJsonwebtoken(payload,  signed);
	}

	public async verify(token: string): Promise<boolean> {
		this.logger.verbose(`Verifying token: ${token}`)
		try {
			await this.jwtService.verifyAsync(token, {secret: authorizationConfiguration.jwtSecret});
			this.logger.verbose(`Token verified: ${token}`)
			return true;
		} catch (e) {
			this.logger.verbose(`Token not verified: ${token}, error: ${e}`)
			return false;
		}
	}
}