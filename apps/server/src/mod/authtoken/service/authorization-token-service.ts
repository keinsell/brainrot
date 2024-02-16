/*
 * MIT License
 *
 * Copyright (c) 2024 Jakub Olan <keinsell@protonmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import {Injectable, Logger}                                      from '@nestjs/common'
import {randomUUID}                                              from 'node:crypto'
import {__authConfig}                                            from '../../../conf/global/__config.js'
import {EventBus}                                                from '../../../kernel/modules/messaging/event-bus.js'
import {TokenManagement}                                         from '../contract/token-management.js'
import {IssueAutheorizationToken}                                from '../dto/issue-autheorization-token.js'
import type {jsonwebtoken}                                       from '../dto/jsonwebtoken.js'
import {AuthenticationToken, type AuthenticationTokenProperties} from '../entity/authentication-token.js'
import {AuthenticationTokenRepository}                           from '../repository/authentication-token-repository.js'
import {AuthenticationTokenId}                                   from '../value-object/authentication-token-id.js'
import {AuthorizationTokenStatus}                                from '../value-object/authorization-token-status.js'
import {SignedAuthenticationToken}                               from '../value-object/signed-authentication-token.js'



@Injectable()
export class AuthorizationTokenService implements TokenManagement {
	private readonly tokenRepository: AuthenticationTokenRepository
	private readonly eventBus: EventBus
	private readonly logger: Logger = new Logger('authentication_token::service')

	private AUDIENCE = 'http://localhost:1337'
	private ISSUER   = 'http://localhost:1337'


	constructor(tokenRepository: AuthenticationTokenRepository, eventBus: EventBus) {
		this.tokenRepository = tokenRepository
		this.eventBus        = eventBus
	}


	async decodeToken(token: SignedAuthenticationToken): Promise<jsonwebtoken> {
		const jwt = await AuthenticationToken.decode(token, new TextEncoder().encode(__authConfig.JWT_SECRET))

		return jwt as jsonwebtoken
	}


	async issueToken(payload: IssueAutheorizationToken): Promise<{
		signature: SignedAuthenticationToken, tokenId: AuthenticationTokenId
	}> {
		const key = new TextEncoder().encode(__authConfig.JWT_SECRET)

		const authTokenProperties: AuthenticationTokenProperties = {
			id:        randomUUID() as AuthenticationTokenId,
			accountId: payload.accountId,
			status:    AuthorizationTokenStatus.DRAFT,
			issuedAt:  new Date(),
			expiresAt: new Date(Date.now() + payload.duration),
		}

		let authorizationToken = AuthenticationToken.build(authTokenProperties)

		const signedJwt = await authorizationToken.sign(key)

		authorizationToken.issue(signedJwt)

		await authorizationToken.commit(this.tokenRepository, this.eventBus)

		return {
			signature: signedJwt as SignedAuthenticationToken,
			tokenId:   authorizationToken.id,
		}
	}


	async revokeToken(tokenId: AuthenticationTokenId): Promise<void> {
		const token = await this.tokenRepository.findById(tokenId)

		if (!token) {
			throw new Error('Token not found')
		}

		token.revoke()

		await token.commit(this.tokenRepository, this.eventBus)
	}


	async verifyToken(token: SignedAuthenticationToken): Promise<any> {
		return await AuthenticationToken.decode(token, new TextEncoder().encode(__authConfig.JWT_SECRET))
	}
}