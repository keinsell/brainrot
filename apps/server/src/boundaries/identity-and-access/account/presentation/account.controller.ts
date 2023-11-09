import {CreateAccount}               from "@iam/account/application/commands/create-account.js"
import {RegisterAccount}             from "@iam/account/application/commands/register-account.js"
import {AccountDto}                  from "@iam/account/application/dtos/account.dto.js"
import {AccountService}              from "@iam/account/services/account.service.js"
import {Body, Controller, Get, Post} from "@nestjs/common"
import {ApiOperation}                from "@nestjs/swagger"
import {readFileSync}                from 'node:fs'
import {dirname}                     from "path"
import {fileURLToPath}               from "url"



function getOperationDocumentation(operation: string): string {
	const __filename         = fileURLToPath(import.meta.url);
	const __dirname          = dirname(__filename);
	const docsDirectory      = `${__dirname}/docs`
	const operationDirectory = `${docsDirectory}/operations`

	try {
		return readFileSync(`${operationDirectory}/${operation}.md`, "utf8")
		//return import(`${operationDirectory}/${operation}.md`) as string
	} catch (e) {
		return ''
	}

}


@Controller("account")
export class AccountController {
	constructor(private service: AccountService) {}


	@ApiOperation({
		operationId: "whoami",
		description: "Returns the current user",
		tags:        ['account'],
	}) @Get()
	async whoami(): Promise<string> {
		return "whoami"
	}


	@ApiOperation({
		operationId: "register",
		summary:     "Register account",
		description: getOperationDocumentation("register"),
		tags:        ['account'],
	})
	@Post()
	async register(@Body() registerAccountBody: RegisterAccount): Promise<AccountDto> {
		const body = registerAccountBody as CreateAccount

		const result = await this.service.register({
			username: body.username,
			email:    body.email,
			password: body.password,
		})

		return {id: result.id}
	}


	@ApiOperation({
		operationId: "forgot-password",
		description: "Sends a password reset email",
		tags:        ['account'],
	}) @Post('forgot-password')
	async forgotPassword(): Promise<string> {
		return "forgot-password"
	}


	@ApiOperation({
		operationId: "reset-password",
		description: "Resets the user's password",
		tags:        ['account'],
	}) @Post('reset-password')
	async resetPassword(): Promise<string> {
		return "reset-password"
	}


	@ApiOperation({
		operationId: "change-password",
		description: "Changes the user's password",
		tags:        ['account'],
	}) @Post('change-password')
	async changePassword(): Promise<string> {
		return "change-password"
	}


	@ApiOperation({
		operationId: "change-email",
		description: "Changes the user's email",
		tags:        ['account'],
	}) @Post('change-email')
	async changeEmail(): Promise<string> {
		return "change-email"
	}


	@ApiOperation({
		operationId: "change-username",
		description: "Changes the user's username",
		tags:        ['account'],
	}) @Post('change-username')
	async changeUsername(): Promise<string> {
		return "change-username"
	}


	@ApiOperation({
		operationId: "delete-account",
		description: "Deletes the user's account",
		tags:        ['account'],
	}) @Post('delete-account')
	async deleteAccount(): Promise<string> {
		return "delete-account"
	}


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