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

import { SignJWT }                    from 'jose'
import { EntityBase }                 from '../../../common/libraries/domain/entity/entity-base.js'
import { __authConfig }               from '../../../configs/global/__config.js'
import { AccountId }                  from '../../account/shared-kernel/account-id.js'
import { AuthenticationTokenIssued }  from '../event/authentication-token-issued.js'
import { AuthenticationTokenRevoked } from '../event/authentication-token-revoked.js'
import { AuthenticationTokenId }      from '../value-object/authentication-token-id.js'
import { AuthorizationTokenStatus }   from '../value-object/authorization-token-status.js'



export interface AuthenticationTokenProperties
  {
	 id : AuthenticationTokenId
	 status : AuthorizationTokenStatus
	 accountId : AccountId
	 issuedAt : Date
	 expiresAt : Date
	 lastUsedAt? : Date
  }


export class AuthenticationToken
  extends EntityBase<AuthenticationTokenId>
  implements AuthenticationTokenProperties
  {
	 accountId : AccountId
	 expiresAt : Date
	 issuedAt : Date
	 lastUsedAt? : Date
	 status : AuthorizationTokenStatus

	 private constructor(payload : AuthenticationTokenProperties)
		{
		  super( {
					  id : payload.id,
					} )
		  this.status    = payload.status
		  this.accountId = payload.accountId
		  this.issuedAt  = payload.issuedAt
		  this.expiresAt = payload.expiresAt
		}

	 static build(payload : AuthenticationTokenProperties) : AuthenticationToken
		{
		  return new AuthenticationToken( payload )
		}

	 public async sign(secret : string) : Promise<string>
		{
		  this.logger.debug( `Signing jsonwebtoken with ${secret}` )
		  const key = new TextEncoder().encode( __authConfig.JWT_SECRET )

		  const jsonwebtoken = new SignJWT( {
														  sub : this.accountId,
														} )

		  jsonwebtoken.setExpirationTime( this.expiresAt )

		  
		  jsonwebtoken.setProtectedHeader( {
														 b64 : true,
														 alg : 'HS256',
													  } )

		  return await jsonwebtoken.sign( key )
		}

	 public issue(signedToken : string) : this
		{
		  this.logger.debug( 'Issuing authentication token...' )
		  this.status = AuthorizationTokenStatus.ISSUED
		  const event = new AuthenticationTokenIssued( this )
		  this.appendEvent( event )
		  this.logger.log( 'Authentication token has been issued.' )
		  return this
		}

	 public revoke() : this
		{
		  this.logger.debug( 'Revoke authentication token...' )
		  this.status = AuthorizationTokenStatus.REVOKED
		  const event = new AuthenticationTokenRevoked( this )
		  this.appendEvent( event )
		  this.logger.log( 'Authentication token has been revoked.' )
		  return this
		}

	 public expire() : this
		{
		  this.logger.debug( 'Expiring authentication token...' )
		  this.status = AuthorizationTokenStatus.EXPIRED
		  const event = new AuthenticationTokenRevoked( this )
		  this.appendEvent( event )
		  this.logger.log( 'Authentication token has expired.' )
		  return this
		}
  }