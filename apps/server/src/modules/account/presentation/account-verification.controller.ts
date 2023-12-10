import {Controller, Post, Query} from "@nestjs/common"
import {ApiOperation, ApiQuery}  from "@nestjs/swagger"
import {AccountFixture}          from "../../../utilities/fixtures/account-fixture.js"
import {AccountVerification}     from "../domain/services/account-verification.js"



@Controller("/account/verification")
export class AccountVerificationController {

	constructor(private accountVerification: AccountVerification) {}


	@ApiOperation({
		operationId: "verify-email",
		summary:     "Verify Email",
		description: "Verifies the user’s email",
		tags:        ['account'],
	}) @Post('verify-email') @ApiQuery({
		name:    "verification_code",
		example: "verification_code",
	})
	async verifyEmail(@Query('verification_code') verificationCode: string): Promise<string> {
		await this.accountVerification.verifyEmail(verificationCode)
		return "ok"
	}


	@ApiOperation({
		operationId: "resend-verification-email",
		summary:     "Re-send verification email",
		description: "Resends the verification email",
		tags:        ['account'],
	}) @Post('resend-verification-email') @ApiQuery({
		name:        "email",
		description: "Email of created account to which verification email should be sent",
		example:     AccountFixture.email,
	})
	async resendVerificationEmail(@Query('email') email: string): Promise<string> {
		email = email.toLowerCase()
		await this.accountVerification.resendVerificationEmail(email)
		return "ok"
	}

}