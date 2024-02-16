import {ApiProperty}                      from '@nestjs/swagger'
import {UniqueIdentifierApiSpecification} from '../../../common/libraries/identification/index.js'
import {ApiAccountMockup}                 from '../../../utilities/fixtures/api-account-mockup.js'


import {RefreshToken} from '../value-objects/tokens/refresh-token.js'



export class AuthenticationResponse {
	@ApiProperty(UniqueIdentifierApiSpecification) id: string

	@ApiProperty({
		name       : 'mfa',
		description: 'Indicates if domain uses MFA. In case of true, additional steps are supposed to be made to activate access token.',
	}) mfa: boolean

	@ApiProperty({
		name       : 'accessToken',
		description: 'Access token.',
		example    : ApiAccountMockup._examples.jwts[0],
		examples   : [
			ApiAccountMockup._examples.jwts[0], ApiAccountMockup._examples.jwts[1], ApiAccountMockup._examples.jwts[2],
		],
	}) accessToken: string

	@ApiProperty(RefreshToken.API_PROPERTY_OPTIONS) refreshToken: string
}
