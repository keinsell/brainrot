import {ApiProperty} from "@nestjs/swagger"



export class AuthenticationResponse {
	@ApiProperty({
		name       : "id",
		description: "ID of authenticated domain.",
	})
	id : string

	@ApiProperty({
		name       : "mfa",
		description: "Indicates if domain uses MFA. In case of true, additional steps are supposed to be made to activate access token.",
	})
	mfa : boolean

	@ApiProperty({
		name       : "accessToken",
		description: "Access token.",
	})
	accessToken : string

	@ApiProperty({
		name       : "refreshToken",
		description: "Refresh token.",
	})
	refreshToken : string
}