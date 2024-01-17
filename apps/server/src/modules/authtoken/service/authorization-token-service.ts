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

import {
  Injectable,
  Logger,
}                                        from '@nestjs/common'
import { JWTPayload }                    from 'jose'
import { randomUUID }                    from 'node:crypto'
import { EventBus }                      from '../../../common/modules/messaging/event-bus.js'
import { __authConfig }                  from '../../../configs/global/__config.js'
import { TokenManagement }               from '../contract/token-management.js'
import { IssueAutheorizationToken }      from '../dto/issue-autheorization-token.js'
import { AuthenticationToken }           from '../entity/authentication-token.js'
import { AuthenticationTokenRepository } from '../repository/authentication-token-repository.js'
import { AuthenticationTokenId }         from '../value-object/authentication-token-id.js'
import { AuthorizationTokenStatus }      from '../value-object/authorization-token-status.js'
import { SignedAuthenticationToken }     from '../value-object/signed-authentication-token.js'



@Injectable()
export class AuthorizationTokenService
  implements TokenManagement
  {
	 private readonly tokenRepository : AuthenticationTokenRepository
	 private readonly eventBus : EventBus
	 private readonly logger : Logger = new Logger( 'authentication_token::service' )

	 private AUDIENCE = 'http://localhost:1337'
	 private ISSUER   = 'http://localhost:1337'

	 constructor(
		tokenRepository : AuthenticationTokenRepository,
		eventBus : EventBus,
	 )
		{
		  this.tokenRepository = tokenRepository
		  this.eventBus        = eventBus
		}

	 async decodeToken(token : SignedAuthenticationToken) : Promise<AuthenticationToken>
		{
		  throw new Error( 'Method not implemented.' )
		}

	 async issueToken(payload : IssueAutheorizationToken) : Promise<SignedAuthenticationToken>
		{
		  // Prepare jsonwebtoken from given payload and requested duration
		  const jwtPayload : JWTPayload = {
			 jti : randomUUID(),
			 aud : this.AUDIENCE,
			 iss : this.ISSUER,
			 sub : payload.accountId,
		  }

		  let authorizationToken = AuthenticationToken.build( {
																				  ...payload,
																				  id         : jwtPayload.jti as AuthenticationTokenId,
																				  issuedAt   : new Date(),
																				  expiresAt  : new Date(
																					 new Date().getTime() + payload.duration ),
																				  accountId  : payload.accountId,
																				  lastUsedAt : new Date(),
																				  status     : AuthorizationTokenStatus.ISSUED,
																				} )

		  const jsonwebtoken = await authorizationToken.sign( __authConfig.JWT_SECRET )

		  authorizationToken.issue( jsonwebtoken )

		  await authorizationToken.commit( this.tokenRepository, this.eventBus )

		  return jsonwebtoken as SignedAuthenticationToken
		}

	 async revokeToken(tokenId : AuthenticationTokenId) : Promise<void>
		{
		  throw new Error( 'Method not implemented.' )
		}

	 async verifyToken(token : SignedAuthenticationToken) : Promise<any>
		{
		  throw new Error( 'Method not implemented.' )
		}
  }