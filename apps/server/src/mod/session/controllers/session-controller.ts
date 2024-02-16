import {
	Body,
	Controller,
	Post,
}                                       from '@nestjs/common'
import {ApiOperation}                   from '@nestjs/swagger'
import ms                from 'ms'
import {OpenapiTags}     from '../../../kernel/modules/documentation/swagger/openapi-tags.js'
import {TokenManagement} from '../../authtoken/contract/token-management.js'
import type {SignedAuthenticationToken} from '../../authtoken/value-object/signed-authentication-token.js'
import {RefreshSession}                 from '../commands/refresh-session.js'
import {SessionService}                 from '../services/session-service.js'



@Controller('session')
export class SessionController
	{

		constructor(
			private tokenManagement: TokenManagement,
			private sessionService: SessionService,
		)
			{

			}

		@Post('refresh-session') @ApiOperation({
			                                       operationId: 'refresh-session',
			                                       description: 'Use a refresh token to extend a session and generate another access token',
			                                       tags       : [OpenapiTags.SESSION],
		                                       })
		async refreshSession(@Body() body: RefreshSession): Promise<string>
			{
				// Decode token
				const maybeRefreshedToken = await this.tokenManagement.decodeToken(body.refreshToken as SignedAuthenticationToken)

				// Find session related to token
				const session = await this.sessionService.getByJti(maybeRefreshedToken.jti)

				// Refresh session
				const accessToken = await this.tokenManagement.issueToken({
					                                                          duration : ms('4h'),
					                                                          accountId: session.subject,
					                                                          metadata : {},
				                                                          })

				// Refresh session
				await this.sessionService.refreshSession(
					session,
					accessToken.tokenId,
				)

				return accessToken.signature
			}
	}