import {Body, Controller, Get, Logger, Post, Req, UseGuards} from "@nestjs/common"
import {
	ApiBasicAuth, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation,
}                                                            from "@nestjs/swagger"
import {Request}                                             from "express"
import {AccountDto}                                          from "../../account/dtos/account.dto.js"
import {Account}                                             from "../../account/entities/account.js"
import {Authenticate}                                        from "../commands/authenticate.js"
import {AuthenticationResponse}                              from "../dtos/authentication-response.js"
import {JwtAuthorizationGuard}                               from "../guards/jwt-authorization-guard.js"
import {LocalAuthorizationGuard}                             from "../guards/local-authorization-guard.js"
import {AuthenticationService}                               from "../services/authentication-service.js"
import {IpAddress}                                           from "../value-objects/ip-address.js"



@Controller('authenticate')
export class AuthenticationController {
	private logger: Logger = new Logger("authentication::controller")


	constructor(private authenticationService: AuthenticationService) {}


	@ApiBasicAuth() @UseGuards(LocalAuthorizationGuard) @Post() @ApiOperation({
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
		const ipAddress = request.ip as IpAddress
		const userAgent = request.headers['user-agent'] as string

		const user: Account = request.user as unknown as Account

		const maybeAuthenticated = await this.authenticationService.authenticate(user.username, body.password, {
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


	@UseGuards(JwtAuthorizationGuard) @Get() @ApiBearerAuth() @ApiOperation({
		operationId: "whoami",
		summary: "Who am I?",
		description: "Returns the current user",
		tags:        ['authentication'],
	})
	@ApiOkResponse({
		type:        AccountDto,
		description: "Account was found in system, and returned.",
	})
	async whoami(@Req() request: Request): Promise<AccountDto> {
		const user: Account = request.user as unknown as Account
		return {
			id:            user.id,
			username:      user.username,
			email:         user.email.address,
			emailVerified: user.email.isVerified
		}
	}


 @Post("refresh-token") @ApiOperation({
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