import { ApiProperty }                      from '@nestjs/swagger'
import { UniqueIdentifierApiSpecification } from '../../../common/libraries/identification/index.js'


import { RefreshToken } from '../value-objects/tokens/refresh-token.js'



export class AuthenticationResponse
  {
	 @ApiProperty( UniqueIdentifierApiSpecification ) id : string

	 @ApiProperty( {
						  name        : 'mfa',
						  description : 'Indicates if domain uses MFA. In case of true, additional steps are supposed to be made to activate access token.',
						} ) mfa : boolean

	 @ApiProperty( {
						  name        : 'accessToken',
						  description : 'Access token.',
						} ) accessToken : string

	 @ApiProperty( RefreshToken.API_PROPERTY_OPTIONS ) refreshToken : string
  }