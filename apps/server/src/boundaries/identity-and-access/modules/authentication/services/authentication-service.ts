import {CredentialValidator}                               from "@boundary/identity-and-access/modules/account/10-application/shared-kernel/credential-validator/credential-validator.js"
import {Session}                                           from "@boundary/identity-and-access/modules/authentication/domain/entities/session.js"
import {SessionRepository}                                 from "@boundary/identity-and-access/modules/authentication/domain/repositories/session-repository.js"
import {AccessToken}                                       from "@boundary/identity-and-access/modules/authentication/domain/value-objects/access-token.js"
import {RefreshToken}                                      from "@boundary/identity-and-access/modules/authentication/domain/value-objects/refresh-token.js"
import {TokenManagement}                                   from "@boundary/identity-and-access/modules/authentication/services/token-management.js"
import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common"
import {ok, Result}                                        from "neverthrow"
import {randomUUID}                                        from "node:crypto"
import {EventBus}                                          from "../../../../../common/infrastructure/messaging/event-bus.js"



@Injectable()
export class AuthenticationService {

	constructor(private credentialValidator: CredentialValidator, private tokenManagement: TokenManagement, private sessionRepository: SessionRepository) {}


	/**
	 * Authenticates a user with their username and password.
	 *
	 * @param {string} username - The username of the user.
	 * @param {string} password - The password of the user.
	 * @param {Object} [metadata] - Additional metadata for the authentication.
	 * @param {string} [metadata.userAgent] - The user agent of the client.
	 * @param {string} [metadata.ipAddress] - The IP address of the client.
	 * @returns {Promise<Result<{accountId: string, accessToken: string, refreshToken: string}, any>>} - The result of the authentication.
	 *   If successful, it contains the account ID, access token, and refresh token.
	 *   If unsuccessful, it contains the error.
	 */
	public async authenticate(username: string, password: string, metadata?: {
		userAgent?: string,
		ipAddress?: string,
	}): Promise<Result<{
		accountId: string,
		accessToken: string, refreshToken: string,
	}, NotFoundException | ForbiddenException>> {
		const isValid = await this.credentialValidator.validateCredentials(username, password)

		if (isValid.isErr()) {
			throw isValid.error
		}

		const account = isValid.value

		const jwtPayload = new AccessToken({
			sub:      account.id,
			aud:      "aud",
			metadata: {
				email: account.email.address,
			},
		})

		const accessToken  = await this.tokenManagement.signAccessToken(new AccessToken(jwtPayload))
		const refreshToken = await this.tokenManagement.signRefreshToken(new RefreshToken(jwtPayload))

		const session = Session.CreateSession({
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
			ipAddress: metadata?.ipAddress,
			userAgent: metadata?.userAgent,
			subject:   account.id,
			jti: jwtPayload.jti,
			id:        randomUUID(),
		})

		await new EventBus().publish(session.getUncommittedEvents())

		// TODO: Not implemented yet

		try {
			await this.sessionRepository.save(session)
		}
		catch (e) {
			console.error(e)
		}



		return ok({
			accountId:    account.id,
			accessToken:  accessToken,
			refreshToken: refreshToken,
		})
	}


	public async logout(): Promise<void> {
		return Promise.resolve(undefined)
	}


	public async refreshToken(refreshToken: string): Promise<string> {
		return "refreshToken"
	}
}