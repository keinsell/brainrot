import {Controller, Post} from "@nestjs/common"
import {ApiOperation}     from "@nestjs/swagger"



@Controller("/account/verification")
export class AccountVerificationController {

	@ApiOperation({
		operationId: "verify-email",
		description: "Verifies the user’s email",
		tags:        ['account'],
	}) @Post('verify-email')
	async verifyEmail(): Promise<string> {
		return "verify-email"
	}


	@ApiOperation({
		operationId: "resend-verification-email",
		description: "Resends the verification email",
		tags:        ['account'],
	}) @Post('resend-verification-email')
	async resendVerificationEmail(): Promise<string> {
		return "resend-verification-email"
	}

}