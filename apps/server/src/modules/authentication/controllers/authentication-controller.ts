import {Body, Controller, Get, Logger, Post, Req, UseGuards} from "@nestjs/common"
import {
	ApiBasicAuth, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation,
}                                                            from "@nestjs/swagger"
import {Request}                                             from "express"
import {AccountDto}                                          from "../../account/dtos/account.dto.js"
import {Account}                                             from "../../account/entities/account.js"
import {SessionService}                                      from "../../session/services/session-service.js"
import {SessionStatus}                                       from "../../session/value-objects/session-status.js"
import {Authenticate}                                        from "../commands/authenticate.js"
import {AuthenticationResponse}                              from "../dtos/authentication-response.js"
import {JwtAuthorizationGuard}                               from "../guards/jwt-authorization-guard.js"
import {LocalAuthorizationGuard}                             from "../guards/local-authorization-guard.js"
import {AuthenticationService}                               from "../services/authentication-service.js"
import {IpAddress}                                           from "../value-objects/ip-address.js"



@Controller('authenticate')
export class AuthenticationController {
	private logger: Logger = new Logger("authentication::controller")


	constructor(private authenticationService: AuthenticationService, private sessionService: SessionService) {
	}


	// TODO: This request is using doubled comparision of password which extends the time of the request.
	@ApiBasicAuth() @UseGuards(LocalAuthorizationGuard) @Post() @ApiOperation({
		operationId: "authenticate",
		summary:     "Basic Authentication",
		description: "Logs the user in with usage of a username and password.",
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

		const maybeAuthenticated = await this.authenticationService.authenticate(user.username, body.password)

		if (maybeAuthenticated.isErr()) {
			throw maybeAuthenticated.error
		}

		const authenticationResult = maybeAuthenticated.value

		const maybeSession = await this.sessionService.startSession({
			subject:   authenticationResult.refreshToken.sub,
			ipAddress,
			userAgent,
			tokenId:   authenticationResult.refreshToken.jti,
			tokens:    [authenticationResult.accessToken.jti],
			endTime:   undefined,
			expiresAt: new Date(authenticationResult.refreshToken.expiresAt),
			status:    SessionStatus.ACTIVE,
		})

		this.logger.log(`Issued session ${maybeSession.id}`)
		this.logger.verbose(JSON.stringify(maybeSession))

		request.session.id = maybeSession.id

		this.logger.log(`Session ${JSON.stringify(request.session)} saved`)

		return {
			id:           authenticationResult.accountId,
			accessToken:  authenticationResult.accessToken.signature,
			refreshToken: authenticationResult.refreshToken.signature,
			mfa:          false,
		}
	}


	@UseGuards(JwtAuthorizationGuard) @Get() @ApiBearerAuth() @ApiOperation({
		operationId: "whoami",
		summary:     "Who am I?",
		description: "Returns the current user",
		tags:        ['authentication'],
	}) @ApiOkResponse({
		type:        AccountDto,
		description: "Account was found in system, and returned.",
	})
	async whoami(@Req() request: Request): Promise<AccountDto> {
		const user: Account = request.user as unknown as Account
		return {
			id:            user.id,
			username:      user.username,
			email:         user.email.address,
			emailVerified: user.email.isVerified,
		}
	}
}