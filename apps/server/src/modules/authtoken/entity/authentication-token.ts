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

import { EntityBase }                 from '../../../common/libraries/domain/entity/entity-base.js'
import { AccountId }                  from '../../account/shared-kernel/account-id.js'
import { AuthenticationTokenIssued }  from '../event/authentication-token-issued.js'
import { AuthenticationTokenRevoked } from '../event/authentication-token-revoked.js'
import { AuthenticationTokenId }      from '../value-object/authentication-token-id.js'
import { AuthorizationTokenStatus }   from '../value-object/authorization-token-status.js'



export interface AuthenticationTokenProperties
  {
	 id : AuthenticationTokenId
	 status : AuthorizationTokenStatus
	 owner : AccountId
	 issuedAt : Date
	 expiresAt : Date
	 lastUsedAt? : Date
  }


export class AuthenticationToken
  extends EntityBase<AuthenticationTokenId>
  implements AuthenticationTokenProperties
  {
	 expiresAt : Date
	 issuedAt : Date
	 lastUsedAt? : Date
	 owner : AccountId
	 status : AuthorizationTokenStatus

	 private constructor(payload : AuthenticationTokenProperties)
		{
		  super( payload.id )
		  this.status    = payload.status
		  this.owner     = payload.owner
		  this.issuedAt  = payload.issuedAt
		  this.expiresAt = payload.expiresAt
		}

	 static build(payload : AuthenticationTokenProperties) : AuthenticationToken
		{
		  return new AuthenticationToken( payload )
		}

	 public issue() : this
		{
		  this.status = AuthorizationTokenStatus.ISSUED
		  const event = new AuthenticationTokenIssued( this )
		  this.appendEvent( event )
		  this.logger.log( 'Authentication token has been issued.' )
		  return this
		}

	 public revoke() : this
		{
		  this.status = AuthorizationTokenStatus.REVOKED
		  const event = new AuthenticationTokenRevoked( this )
		  this.appendEvent( event )
		  this.logger.log( 'Authentication token has been revoked.' )
		  return this
		}

	 public expire() : this
		{
		  this.status = AuthorizationTokenStatus.EXPIRED
		  const event = new AuthenticationTokenRevoked( this )
		  this.appendEvent( event )
		  this.logger.log( 'Authentication token has expired.' )
		  return this
		}
  }