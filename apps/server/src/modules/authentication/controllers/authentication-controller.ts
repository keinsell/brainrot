import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
}                                     from '@nestjs/common'
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
}                                     from '@nestjs/swagger'
import { Request }                    from 'express'
import ms                             from 'ms'
import { Account }                    from '../../account/entities/account.js'
import type { AccountId }             from '../../account/shared-kernel/account-id.js'
import { AccountViewModel }           from '../../account/view-model/account-view-model.js'
import { TokenManagement }            from '../../authtoken/contract/token-management.js'
import { SessionService }             from '../../session/services/session-service.js'
import { SessionExpirationDate }      from '../../session/value-objects/session-expiration-date.js'
import { SessionStatus }              from '../../session/value-objects/session-status.js'
import { Authenticate }               from '../commands/authenticate.js'
import { AuthenticationResponse }     from '../dtos/authentication-response.js'
import { JwtAuthorizationGuard }      from '../guards/jwt-authorization-guard.js'
import { LocalAuthorizationGuard }    from '../guards/local-authorization-guard.js'
import { LocalAuthenticationService } from '../services/local-authentication-service.js'
import { IPV4 }                       from '../value-objects/ipv4.js'



@Controller( 'authenticate' )
export class AuthenticationController
  {
	 private logger : Logger = new Logger( 'authentication::controller' )


	 constructor(
		private authenticationService : LocalAuthenticationService,
		private sessionService : SessionService,
		private tokenManagement : TokenManagement,
	 )
		{
		}


	 // TODO: This request is using doubled comparison of password which extends the time of the request.
	 @ApiBasicAuth() @UseGuards( LocalAuthorizationGuard ) @Post() @ApiOperation( {
																											  operationId : 'authenticate',
																											  summary     : 'Basic Authentication',
																											  description : 'Logs the user in with usage of a username and password.',
																											  tags        : [ 'authentication' ],
																											} ) @ApiCreatedResponse( {
																																				description : 'The user has been successfully authenticated and session was created.',
																																				type        : AuthenticationResponse,
																																			 } ) @ApiNotFoundResponse(
		{
		  description : 'The user could not be found.',
		} ) @ApiBody( {type : Authenticate} )
	 async authenticate(
		@Req() request : Request,
		@Body() body : Authenticate,
	 ) : Promise<AuthenticationResponse>
		{
		  const ipAddress = request.ip as IPV4
		  const userAgent = request.headers[ 'user-agent' ] as string

		  const user : Account = request.user as unknown as Account

		  const maybeAuthenticated = await this.authenticationService.authenticate( user.username, body.password )

		  if ( maybeAuthenticated.isErr() )
			 {
				throw maybeAuthenticated.error
			 }

		  const authenticationResult = maybeAuthenticated.value

		  const maybeSession = await this.sessionService.startSession( {
																							  subject   : authenticationResult.refreshToken.sub as AccountId,
																							  ipAddress,
																							  userAgent,
																							  tokenId   : authenticationResult.refreshToken.jti,
																							  tokens    : [ authenticationResult.accessToken.jti ],
																							  endTime   : null,
																							  expiresAt : new Date(
																								 authenticationResult.refreshToken.expiresAt ) as SessionExpirationDate,
																							  status    : SessionStatus.ACTIVE,
																							} )

		  const accessToken = await this.tokenManagement.issueToken( {
																							accountId : authenticationResult.accountId as AccountId,
																							duration  : ms( '32h' ),
																							metadata  : {},
																						 } )

		  this.logger.log( `Issued session ${maybeSession.id}` )
		  this.logger.verbose( JSON.stringify( maybeSession ) )

		  //		  request.session[ 'data' ] = maybeSession

		  this.logger.log( `Session ${JSON.stringify( request.session )} saved` )

		  return {
			 id           : authenticationResult.accountId,
			 accessToken  : accessToken,
			 refreshToken : authenticationResult.refreshToken.signature,
			 mfa          : false,
		  }
		}


	 @UseGuards( JwtAuthorizationGuard ) @Get() @ApiBearerAuth() @ApiOperation( {
																											operationId : 'whoami',
																											summary     : 'Who am I?',
																											description : 'Returns the current user',
																											tags        : [ 'authentication' ],
																										 } ) @ApiOkResponse( {
																																	  type        : AccountViewModel,
																																	  description : 'Account was found in system, and returned.',
																																	} )
	 async whoami(@Req() request : Request) : Promise<AccountViewModel>
		{
		  const user : Account = request.user as unknown as Account
		  return {
			 id            : user.id,
			 username      : user.username,
			 email         : user.email.address,
			 emailVerified : user.email.isVerified,
		  }
		}
  }