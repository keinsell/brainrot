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

import { Injectable }                    from '@nestjs/common'
import { AuthenticationToken }           from '../entity/authentication-token.js'
import { AuthenticationTokenRepository } from './authentication-token-repository.js'



@Injectable()
export class InMemoryAuthenticationTokenRepository
  extends AuthenticationTokenRepository
  {
	 private repository : AuthenticationToken[] = []

	 create(entity : AuthenticationToken) : Promise<AuthenticationToken>
		{
		  this.repository.push( entity )
		  return Promise.resolve( entity )
		}

	 delete(entity : AuthenticationToken) : Promise<void>
		{
		  this.repository = this.repository.filter( token => token.id !== entity.id )
		  return Promise.resolve()
		}

	 exists(entity : AuthenticationToken) : Promise<boolean>
		{
		  const exists = this.repository.some( token => token.id === entity.id )
		  return Promise.resolve( exists )
		}

	 findById(id : string) : Promise<AuthenticationToken | null>
		{
		  const token = this.repository.find( token => token.id === id ) || null
		  return Promise.resolve( token )
		}

	 update(entity : AuthenticationToken) : Promise<AuthenticationToken>
		{
		  const index = this.repository.findIndex( token => token.id === entity.id )
		  if ( index >= 0 )
			 {
				this.repository[ index ] = entity
				return Promise.resolve( entity )
			 }
		  return Promise.reject( new Error( 'Entity not found' ) )
		}
  }