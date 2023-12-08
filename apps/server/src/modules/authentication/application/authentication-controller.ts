import {Body, Controller, Get, Logger, Post, Req, UseGuards}                  from "@nestjs/common"
import {AuthGuard}                                                            from "@nestjs/passport"
import {ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation} from "@nestjs/swagger"
import {Request}                                                              from "express"
import {Account}                                                              from "../../account/domain/account.js"
import {AuthenticationService}                                                from "../domain/services/authentication-service.js"
import {IpAddress}                                                            from "../domain/value-objects/ip-address.js"
import {Authenticate}                                                         from "./authenticate.js"
import {AuthenticationResponse}                                               from "./dtos/authentication-response.js"



@Controller('authenticate')
export class AuthenticationController {
	private logger: Logger = new Logger("authenitcation::controller")


	constructor(private authenticationService: AuthenticationService) {}


	@UseGuards(AuthGuard('local')) @Post() @ApiOperation({
		operationId: "authenticate",
		description: "Logs the user in",
		tags:        ['authentication'],
	}) @ApiCreatedResponse({
		description: "The user has been successfully authenticated and session was created.",
		type:        AuthenticationResponse,
	}) @ApiNotFoundResponse({
		description: "The user could not be found.",
	})
	async authenticate(@Req() request: Request, @Body() body: Authenticate): Promise<AuthenticationResponse> {
		this.logger.verbose(JSON.stringify(request.user))

		const ipAddress = request.ip as IpAddress
		const userAgent = request.headers['user-agent'] as string

		const user: Account = request.user as unknown as Account

		const maybeAuthenticated = await this.authenticationService.authenticate(user.username, user.password.plain!, {
			userAgent: userAgent,
			ipAddress: ipAddress,
		})

		if (maybeAuthenticated.isErr()) {
			throw maybeAuthenticated.error
		}

		const authenticationResult = maybeAuthenticated.value

		return {
			id:           authenticationResult.accountId,
			accessToken:  authenticationResult.accessToken,
			refreshToken: authenticationResult.refreshToken,
			mfa:          false,
		}
	}


	@Get() @ApiBearerAuth("bearer") @UseGuards(AuthGuard('jwt')) @ApiOperation({
		operationId: "whoami",
		description: "Returns the current user",
		tags:        ['authentication'],
	})
	async whoami(): Promise<string> {
		return "whoami"
	}


	@UseGuards(AuthGuard('jwt')) @Post("refresh-token") @ApiOperation({
		operationId: "refresh-token",
		description: "Use a refresh token to extend a session and generate another access token",
		tags:        ['authentication'],
	})
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
}