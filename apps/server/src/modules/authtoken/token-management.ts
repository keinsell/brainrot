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
} from '@nestjs/common'
import {
  JwtService,
  JwtSignOptions,
} from '@nestjs/jwt'

import { __authConfig } from '../../configs/global/__config.js'
import { SingedJwt }    from '../authentication/value-objects/singed-jwt.js'
import { AccessToken }  from '../authentication/value-objects/tokens/access-token.js'
import { RefreshToken } from '../authentication/value-objects/tokens/refresh-token.js'
import { jsonwebtoken } from './dto/jsonwebtoken.js'
import { JsonWebToken } from './entity/jsonwebtoken.js'



export abstract class TokenManagement
  {
	 abstract create(payload : jsonwebtoken) : Promise<JsonWebToken | RefreshToken | AccessToken>


	 abstract sign(payload : JsonWebToken | RefreshToken | AccessToken) : Promise<SingedJwt>


	 abstract verify(token : string) : Promise<boolean>


	 abstract decode<T = jsonwebtoken>(token : string) : Promise<T>
  }


@Injectable()
export class JwtTokenManagement
  extends TokenManagement
  {
	 private logger : Logger = new Logger( 'token-management' )
	 private readonly jwtService : JwtService
	 private readonly options : JwtSignOptions

	 constructor(jwtService : JwtService)
		{
		  super()
		  this.jwtService = jwtService
		}

	 public async create(payload : jsonwebtoken) : Promise<JsonWebToken | RefreshToken | AccessToken>
		{
		  this.logger.verbose( `Creating token for payload: ${JSON.stringify( payload )}` )
		  const tokenPayload = new JsonWebToken( payload )
		  this.logger.verbose( `Created token payload: ${JSON.stringify( tokenPayload )}` )
		  return tokenPayload
		}

	 public async decode<T = jsonwebtoken>(token : string) : Promise<T>
		{
		  this.logger.verbose( `Decoding token: ${token}` )
		  const decoded = await this.jwtService.decode( token ) as T
		  this.logger.verbose( `Decoded token: ${JSON.stringify( decoded )}` )
		  return decoded
		}

	 public async sign(payload : JsonWebToken | RefreshToken | AccessToken) : Promise<SingedJwt>
		{
		  this.logger.verbose( `Signing token: ${JSON.stringify( payload )}` )
		  const signed = await this.jwtService.signAsync( payload.toPlainObject(), {secret : __authConfig.JWT_SECRET} )
		  this.logger.verbose( `Signed token: ${signed}` )
		  this.logger.log( `Issued token ${payload.jti} for ${payload.sub}` )
		  return new SingedJwt( payload, signed )
		}

	 public async verify(token : string) : Promise<boolean>
		{
		  this.logger.verbose( `Verifying token: ${token}` )
		  try
			 {
				await this.jwtService.verifyAsync( token, {secret : __authConfig.JWT_SECRET} )
				this.logger.verbose( `Token verified: ${token}` )
				return true
			 }
		  catch ( e )
			 {
				this.logger.verbose( `Token not verified: ${token}, error: ${e}` )
				return false
			 }
		}
  }