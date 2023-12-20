import {Body, Controller, Post} from "@nestjs/common"
import {ApiOperation}           from "@nestjs/swagger"
import {OpenapiTags}            from "../../../common/modules/documentation/swagger/openapi-tags.js"
import {TokenManagement}        from "../../authentication/services/token-management.js"
import {AccessToken}            from "../../authentication/value-objects/tokens/access-token.js"
import {RefreshSession}         from "../commands/refresh-session.js"
import {SessionService}         from "../services/session-service.js"



@Controller('session')
export class SessionController {

	constructor(private tokenManagement: TokenManagement, private sessionService: SessionService) {

	}

	@Post("refresh-session") @ApiOperation({
		operationId: "refresh-session",
		description: "Use a refresh token to extend a session and generate another access token",
		tags:        [OpenapiTags.SESSION],
	})
	async refreshSession(@Body() body: RefreshSession): Promise<string> {
		// Decode token
		const maybeRefreshedToken = await this.tokenManagement.decode(body.refreshToken)

		// Find session related to token
		const session = await this.sessionService.getByJti(maybeRefreshedToken.jti)

		// Refresh session
		const accessToken = await this.tokenManagement.sign(new AccessToken({
		...maybeRefreshedToken,
			iat: new Date().getTime(),
			exp: new Date().getTime() + 1000 * 60 * 60,
		}))

		// Refresh session
		await this.sessionService.refreshSession(session, accessToken.jti)

		return accessToken.signature
	}
}