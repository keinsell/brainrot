import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {setUser}                                            from '@sentry/node'
import ms                                                   from 'ms'
import {ok, Result}                                        from 'neverthrow'
import {PlainText} from "../../../common/modules/communication/mailer/value-object/plain-text.js"
import type {AccountId}                                     from '../../account/shared-kernel/account-id.js'
import {CredentialValidator}                                from '../../account/shared-kernel/credential-validator/credential-validator.js'
import type {Username}                                      from '../../account/value-objects/username.js'
import {TokenManagement}                                    from '../../authtoken/contract/token-management.js'
import type {SignedAuthenticationToken}                     from '../../authtoken/value-object/signed-authentication-token.js'
import {AuthenticationService}                              from '../contract/authentication-service.js'



@Injectable()
export class LocalAuthenticationService extends AuthenticationService {

	constructor(private credentialValidator: CredentialValidator, private tokenManagement: TokenManagement) {
		super()
	}


	/**
	 * Authenticates a user with their username and password.
	 *
	 * @param {string} username - The username of the user.
	 * @param {string} password - The password of the user.
	 * @param {Object} [metadata] - Additional metadata for the
	 *     authentication.
	 * @param {string} [metadata.userAgent] - The user agent of the client.
	 * @param {string} [metadata.ipAddress] - The IP address of the client.
	 * @returns {Promise<Result<{accountId: string, accessToken: string,
	 *     refreshToken: string}, any>>} - The result of the
	 *     authentication. If successful, it contains the domain ID, access
	 *     token, and refresh token. If unsuccessful, it contains the
	 *     error.
	 */
	public async authenticate(username: Username, password: PlainText): Promise<Result<{
		accessToken: SignedAuthenticationToken, refreshToken: SignedAuthenticationToken, accountId: AccountId
	}, NotFoundException | ForbiddenException>> {
		const accountOrException = await this.credentialValidator.validateCredentials(username, password)

		if (accountOrException.isErr()) {
			throw accountOrException.error
		}

		const account = accountOrException.value

		setUser({
			id:       account.id,
			username: account.username,
			email:    account.email.address,
		})

		const signedAccessToken = await this.tokenManagement.issueToken({
			accountId: account.id,
			duration:  ms('4h'),
			metadata:  {},
		})

		const signedRefreshToken = await this.tokenManagement.issueToken({
			accountId: account.id,
			duration:  ms('3w'),
			metadata:  {},
		})

		return ok({
			accountId:    account.id,
			accessToken:  signedAccessToken.signature,
			refreshToken: signedRefreshToken.signature,
		})
	}


	public async logout(): Promise<void> {
		return Promise.resolve(undefined)
	}


	public async refreshToken(refreshToken: string): Promise<{
		refreshToken: SignedAuthenticationToken, accessToken: SignedAuthenticationToken
	}> {
		const decodedRefreshToken = await this.tokenManagement.decodeToken(refreshToken as SignedAuthenticationToken)

		const issuedAccessToken = await this.tokenManagement.issueToken({
			accountId: decodedRefreshToken.sub as AccountId,
			duration:  ms('4h'),
			metadata:  {},
		})

		return {
			refreshToken: refreshToken as SignedAuthenticationToken,
			accessToken:  issuedAccessToken.signature,
		}
	}
}