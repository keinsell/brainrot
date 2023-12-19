import {Controller, Post, UseGuards} from "@nestjs/common"
import {ApiOperation}                from "@nestjs/swagger"
import {OpenapiTags}                 from "../../../common/infrastructure/documentation/swagger/openapi-tags.js"
import {JwtAuthorizationGuard}       from "../../authentication/guards/jwt-authorization-guard.js"



@Controller("/account/recovery")
export class AccountRecoveryController {

	@UseGuards(JwtAuthorizationGuard)
	@ApiOperation({
		operationId: "forgot-password",
		summary:     "Request password reset",
		description: "Sends a password reset email",
		tags:        [OpenapiTags.ACCOUNT_RECOVERY],
	}) @Post('forgot-password')
	async forgotPassword(): Promise<string> {
		// TODO: Generate Password Reset Request
		// TODO: Save PasswordResetRequest in cache for specific user
		// TODO: Send verification email for domain
		// TODO: Perform such actions only if domain is verified.
		return "forgot-password"
	}

	@UseGuards(JwtAuthorizationGuard)
	@ApiOperation({
		operationId: "reset-password",
		summary:     "Reset password",
		description: "Resets the user's password",
		tags:        [OpenapiTags.ACCOUNT_RECOVERY],
	}) @Post('reset-password')
	async resetPassword(): Promise<string> {
		return "reset-password"
	}
}