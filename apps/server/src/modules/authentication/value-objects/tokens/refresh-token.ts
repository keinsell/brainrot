import type { ApiPropertyOptions } from '@nestjs/swagger'
import jwt                         from 'jsonwebtoken'
import { JsonWebToken }            from '../../../authtoken/entity/jsonwebtoken.js'



export class RefreshToken
  extends JsonWebToken
  {


	 static API_PROPERTY_OPTIONS : ApiPropertyOptions = {
		name        : 'refreshToken',
		description : '...',
		example     : jwt.sign( {payload : {}}, 'secret' ),
		examples    : [
		  jwt.sign( {payload : {}}, 'secret' ),
		  jwt.sign( {payload : {}}, 'secret' ),
		  jwt.sign( {payload : {}}, 'secret' ),
		],
	 }
  }