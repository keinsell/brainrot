import {Authenticate}                   from "@boundary/identity-and-access/authentication/application/authenticate.js"
import {AuthenticationService}          from "@boundary/identity-and-access/authentication/services/authentication-service.js"
import {Body, Controller, Delete, Post} from "@nestjs/common"
import {ApiOperation}                   from "@nestjs/swagger"



@Controller('authenticate')
export class AuthenticationController {

	constructor(
		private authenticationService: AuthenticationService,
	) {

	}

	@ApiOperation({
		operationId: "authenticate",
		description: "Logs the user in",
		tags:        ['account', 'authentication'],
	}) @Post()
	async authenticate(@Body() body: Authenticate ): Promise<string> {
		const {username, password} = body

		const maybeAuthenticationTokens = await this.authenticationService.authenticate(username, password)

		if (maybeAuthenticationTokens.isErr()) {
			throw maybeAuthenticationTokens.error
		}

		// TODO: Check if user have 2FA enabled
		// TODO: If 2FA is enabled, thow error

		return "login"
	}


	@ApiOperation({
		operationId: "refresh-token",
		description: "Use a refresh token to extend a session and generate another access token",
		tags:        ['account', 'authentication'],
	}) @Post()
	async refreshToken(@Body() body: Authenticate): Promise<string> {
		const {
				  username,
				  password,
			  } = body
		const isValid = await this.authenticationService.authenticate(username, password)

		//if (isValid.isErr()) {
		//	throw isValid.error
		//}

		// TODO: Generate JWT Tokens
		// TODO: Return JWT

		return "login"
	}

	@ApiOperation({
		operationId: "logout",
		description: "deletes the current session. This effectively logs out the user, and they must reauthenticate to continue using protected resources.",
		tags:        ['account', "session", "authentication"],
	}) @Delete()
	async logout(): Promise<string> {
		return "logout"
	}
}