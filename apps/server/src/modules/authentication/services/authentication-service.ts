import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common"
import {ok, Result}                                        from "neverthrow"
import {randomUUID}                                        from "node:crypto"
import {EventBus}                                          from "../../../common/infrastructure/messaging/event-bus.js"
import {CredentialValidator}                               from "../../account/10-application/shared-kernel/credential-validator/credential-validator.js"
import {Session}                                           from "../domain/entities/session.js"
import {SessionRepository}                                 from "../domain/repositories/session-repository.js"
import {AccessToken}                                       from "../domain/value-objects/access-token.js"
import {IpAddress}                                         from "../domain/value-objects/ip-address.js"
import {RefreshToken}                                      from "../domain/value-objects/refresh-token.js"
import {SessionStatus}                                     from "../domain/value-objects/session-status.js"
import {TokenManagement}                                   from "./token-management.js"



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
	 *   If successful, it contains the domain ID, access token, and refresh token.
	 *   If unsuccessful, it contains the error.
	 */
	public async authenticate(username: string, password: string, metadata?: {
		userAgent?: string, ipAddress?: string,
	}): Promise<Result<{
		accountId: string, accessToken: string, refreshToken: string,
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

		const accessToken  = new AccessToken(jwtPayload)
		const refreshToken = new RefreshToken(jwtPayload)

		const signedAccessToken  = await this.tokenManagement.signAccessToken(accessToken)
		const signedRefreshToken = await this.tokenManagement.signRefreshToken(refreshToken)

		const session = Session.CreateSession({
			device:    "",
			location:  "",
			status:    SessionStatus.ACTIVE,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
			ipAddress: metadata?.ipAddress as IpAddress,
			userAgent: metadata?.userAgent,
			subject:   account.id,
			startTime: new Date(),
			endTime:   null,
			id:        randomUUID(),
		})

		await new EventBus().publishAll(session.getUncommittedEvents() as any)

		try {
			await this.sessionRepository.save(session)
		} catch (e) {
			console.error(e)
		}

		return ok({
			accountId:    account.id,
			accessToken:  signedAccessToken,
			refreshToken: signedRefreshToken,
		})
	}


	public async logout(): Promise<void> {
		return Promise.resolve(undefined)
	}


	public async refreshToken(refreshToken: string): Promise<string> {
		return "refreshToken"
	}
}