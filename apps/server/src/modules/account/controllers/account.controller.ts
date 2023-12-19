import {Body, Controller, Post, UseGuards} from "@nestjs/common"
import {ApiOkResponse, ApiOperation}       from "@nestjs/swagger"
import {readFileSync}                      from 'node:fs'
import {dirname}                           from "path"
import {fileURLToPath}                     from "url"
import {JwtAuthorizationGuard}             from "../../authentication/guards/jwt-authorization-guard.js"
import {AccountDto}                        from "../dtos/account.dto.js"
import {CreateAccountDto}                  from "../dtos/create-account-dto.js"
import {RegisterAccountDto}                from "../dtos/register-account-dto.js"
import {AccountService}                    from "../services/account-service.js"



function getOperationDocumentation(operation: string): string {
	const __filename         = fileURLToPath(import.meta.url);
	const __dirname          = dirname(__filename);
	const docsDirectory      = `${__dirname}/../10-application/docs`
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
		operationId: "register",
		summary:     "Register account",
		description: getOperationDocumentation("register"),
		tags:        ['account'],
	}) @ApiOkResponse({
		type:        AccountDto,
		description: "Account was successfully registered in system.",
	}) @Post()
	async register(@Body() registerAccountBody: RegisterAccountDto): Promise<AccountDto> {
		const body = registerAccountBody as CreateAccountDto

		// TODO: Normalize Email
		// TODO: Normalize Username

		const result = await this.service.register({
			username: body.username,
			email:    body.email,
			password: body.password,
		})

		return {
			id:            result.id,
			email:         result.email.address,
			emailVerified: result.email.isVerified,
			username:      result.username,
		}
	}

	@UseGuards(JwtAuthorizationGuard)
	@ApiOperation({
		operationId: "change-password",
		description: "Changes the user's password",
		tags:        ['account'],
	}) @Post('change-password')
	async changePassword(): Promise<string> {
		return "change-password"
	}

	@UseGuards(JwtAuthorizationGuard)
	@ApiOperation({
		operationId: "change-email",
		description: "Changes the user's email",
		tags:        ['account'],
	}) @Post('change-email')
	async changeEmail(): Promise<string> {
		return "change-email"
	}

	@UseGuards(JwtAuthorizationGuard)
	@ApiOperation({
		operationId: "change-username",
		description: "Changes the user's username",
		tags:        ['account'],
	}) @Post('change-username')
	async changeUsername(): Promise<string> {
		return "change-username"
	}

	@UseGuards(JwtAuthorizationGuard)
	@ApiOperation({
		operationId: "delete-account",
		description: "Deletes the user's account.",
		tags:        ['account'],
	}) @Post('delete-account')
	async deleteAccount(): Promise<string> {
		return "delete-domain"
	}
}