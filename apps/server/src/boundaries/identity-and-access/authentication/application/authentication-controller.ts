import {
	Authenticate,
}                from "@boundary/identity-and-access/authentication/application/authenticate.js"
import {
	AuthenticationResponse,
}                from "@boundary/identity-and-access/authentication/application/dtos/authentication-response.js"
import {
	IpAddress,
}                from "@boundary/identity-and-access/authentication/domain/value-objects/ip-address.js"
import {
	AuthenticationService,
}                from "@boundary/identity-and-access/authentication/services/authentication-service.js"
import {
	Body, Controller, Delete, Post, Req,
}                from "@nestjs/common"
import {
	ApiCreatedResponse, ApiNotFoundResponse, ApiOperation,
}                from "@nestjs/swagger"
import {Request} from "express"



@Controller('authenticate')
export class AuthenticationController {

	constructor(
		private authenticationService: AuthenticationService,
	) {

	}

	@Post()
	@ApiOperation({
		operationId: "authenticate",
		description: "Logs the user in",
		tags:        ['account', 'authentication'],
	})
	@ApiCreatedResponse({
		description: "The user has been successfully authenticated and session was created.",
		type: AuthenticationResponse,
	})
	@ApiNotFoundResponse({
		description: "The user could not be found.",
	})
	async authenticate(@Req() request: Request, @Body() body: Authenticate): Promise<AuthenticationResponse> {
		const {username, password} = body

		const ipAddress = request.ip as IpAddress
		const userAgent = request.headers['user-agent'] as string


		const maybeAuthenticated = await this.authenticationService.authenticate(username, password, {userAgent: userAgent, ipAddress: ipAddress})

		if (maybeAuthenticated.isErr()) {
			throw maybeAuthenticated.error
		}

		const authenticationResult = maybeAuthenticated.value

		return {
			id: authenticationResult.accountId,
			accessToken: authenticationResult.accessToken,
			mfa: false,
		}
	}


	@ApiOperation({
		operationId: "refresh-token",
		description: "Use a refresh token to extend a session and generate another access token",
		tags:        ['account', 'authentication'],
	}) @Post("refresh-token")
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