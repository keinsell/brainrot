import type {ApiPropertyOptions} from '@nestjs/swagger'
import {ApiAccountMockup}        from '../../../../utils/fixtures/api-account-mockup.js'
import {JsonWebToken}            from '../../../authtoken/entity/jsonwebtoken.js'



export class RefreshToken extends JsonWebToken {

	static API_PROPERTY_OPTIONS: ApiPropertyOptions = {
		name:        'refreshToken',
		description: '...',
		example:     ApiAccountMockup._examples.jwts[0],
		examples:    [
			ApiAccountMockup._examples.jwts[0], ApiAccountMockup._examples.jwts[1], ApiAccountMockup._examples.jwts[2],
		],
	}
}
