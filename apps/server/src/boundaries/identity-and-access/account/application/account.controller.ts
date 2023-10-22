import {Controller, Get, Post} from "@nestjs/common"
import {ApiOperation}          from "@nestjs/swagger"



@Controller("account")
export class AccountController {
	constructor() {}

	@ApiOperation({
		operationId: "whoami",
		description: "Returns the current user",
		tags:        ['account'],
	}) @Get()
	async whoami(): Promise<string> {
		return "whoami"
	}

	@ApiOperation({
		operationId: "authenticate",
		description: "Logs the user in",
		tags:        ['account'],
	}) @Post('authenticate')
	async authenticate(): Promise<string> {
		return "authenticate"
	}

	@ApiOperation({
		operationId: "register",
		description: "Registers a new user",
		tags:        ['account'],
	}) @Post()
	async register(): Promise<string> {
		return "register"
	}

	@ApiOperation({
		operationId: "logout",
		description: "Logs the user out",
		tags:        ['account'],
	}) @Post('logout')
	async logout(): Promise<string> {
		return "logout"
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
		description: "Verifies the user's email",
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