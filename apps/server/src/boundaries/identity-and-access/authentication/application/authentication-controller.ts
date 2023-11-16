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
	async destroySession(): Promise<string> {
		return "logout"
	}
}