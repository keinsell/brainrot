import { ApiProperty }  from '@nestjs/swagger'
import { RefreshToken } from '../../authentication/value-objects/tokens/refresh-token.js'


//@ApiModel({
//	name:        "RefreshSession",
//	//description: "Payload user for refreshing existing session (Refresh Token)",
//})
export class RefreshSession
  {
	 @ApiProperty( RefreshToken.API_PROPERTY_OPTIONS ) refreshToken : string
  }