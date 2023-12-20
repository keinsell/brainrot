import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common"
import {ok, Result}                                        from "neverthrow"
import {CredentialValidator}                               from "../../account/shared-kernel/credential-validator/credential-validator.js"
import {JwtPayload}                                        from "../value-objects/jwt-payload.js"
import {SignedJsonwebtoken}                                from "../value-objects/signed-jsonwebtoken.js"
import {AccessToken}                                       from "../value-objects/tokens/access-token.js"
import {RefreshToken}                                      from "../value-objects/tokens/refresh-token.js"
import {TokenManagement}                                   from "./token-management.js"



@Injectable()
export class AuthenticationService {

	constructor(private credentialValidator: CredentialValidator, private tokenManagement: TokenManagement) {}


	/**
	 * Authenticates a user with their username and password.
	 *
	 * @param {string} username - The username of the user.
	 * @param {string} password - The password of the user.
	 * @param {Object} [metadata] - Additional metadata for the authentication.
	 * @param {string} [metadata.userAgent] - The user agent of the client.
	 * @param {string} [metadata.ipAddress] - The IP address of the client.
	 * @returns {Promise<Result<{accountId: string, accessToken: string, refreshToken: string}, any>>} - The result of the authentication.
	 *   If successful, it contains the domain ID, access token, and refresh token.
	 *   If unsuccessful, it contains the error.
	 */
	public async authenticate(username: string, password: string): Promise<Result<{
		accessToken: SignedJsonwebtoken, refreshToken: SignedJsonwebtoken, accountId: string
	}, NotFoundException | ForbiddenException>> {
		const isValid = await this.credentialValidator.validateCredentials(username, password)

		if (isValid.isErr()) {
			throw isValid.error
		}

		const account = isValid.value

		const tokenPayload: Omit<JwtPayload, "exp" | "iat" | "nbf" | "jti"> & {jti?: string, nbf?:number, iat?: number, exp?: number} = {
			sub:      account.id,
			aud:      "http://localhost:1337",
			metadata: {
				username: account.username,
				email: account.email.address,
			},
		}

		const accessToken = new AccessToken({
		...tokenPayload,
		}, "1h")

		const refreshToken = new AccessToken({
			...tokenPayload,
		}, "3w")

		const signedAccessToken = await this.tokenManagement.sign(accessToken)
		const signedRefreshToken = await this.tokenManagement.sign(refreshToken)

		return ok({
			accountId:    account.id,
			accessToken:  signedAccessToken,
			refreshToken: signedRefreshToken,
		})
	}


	public async logout(): Promise<void> {
		return Promise.resolve(undefined)
	}


	public async refreshToken(refreshToken: string): Promise<{ refreshToken: RefreshToken, accessToken: SignedJsonwebtoken }> {
		const decodedRefreshToken = await this.tokenManagement.decode(refreshToken)
		const refreshTokenObject = new RefreshToken(decodedRefreshToken)

		const accessTokn = new AccessToken({
		...decodedRefreshToken,
			iat: new Date().getTime(),
			exp: new Date().getTime() + 1000 * 60 * 60,
		}, "1h")

		const signedAccessToken = await this.tokenManagement.sign(accessTokn)

		return {
			refreshToken: refreshTokenObject,
			accessToken:  signedAccessToken,
		}
	}
}