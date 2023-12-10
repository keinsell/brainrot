import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common"
import {JwtService}                                        from "@nestjs/jwt"
import {ok, Result}                                        from "neverthrow"
import {randomUUID}                                        from "node:crypto"
import {EventBus}                                          from "../../../../common/infrastructure/messaging/event-bus.js"
import {CredentialValidator}                               from "../../../account/shared-kernel/credential-validator/credential-validator.js"
import {Session}                                           from "../../../session/session.js"
import {SessionRepository}                                 from "../repositories/session-repository.js"
import {IpAddress}                                         from "../value-objects/ip-address.js"
import {SessionStatus}                                     from "../value-objects/session-status.js"
import {AccessToken}                                       from "../value-objects/tokens/access-token.js"



@Injectable()
export class AuthenticationService {

	constructor(private credentialValidator: CredentialValidator, private tokenManagement: JwtService, private sessionRepository: SessionRepository, private eventbus: EventBus) {}


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

		const accessToken = new AccessToken(jwtPayload)

		const signedAccessToken = await this.tokenManagement.signAsync(accessToken.toPlainObject())

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

		await this.eventbus.publishAll(session.getUncommittedEvents() as any)

		try {
			await this.sessionRepository.save(session)
		} catch (e) {
			console.error(e)
		}

		return ok({
			accountId:    account.id,
			accessToken:  signedAccessToken,
			refreshToken: signedAccessToken,
		})
	}


	public async logout(): Promise<void> {
		return Promise.resolve(undefined)
	}


	public async refreshToken(refreshToken: string): Promise<string> {
		return "refreshToken"
	}
}