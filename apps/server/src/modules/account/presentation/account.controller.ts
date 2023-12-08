import {Body, Controller, Post}      from "@nestjs/common"
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger"
import {readFileSync}                from 'node:fs'
import {dirname}                     from "path"
import {fileURLToPath}               from "url"
import {AccountService}              from "../domain/services/account-service.js"
import {AccountDto}                  from "../dtos/account.dto.js"
import {CreateAccountDto}            from "../dtos/create-account-dto.js"
import {RegisterAccountDto}          from "../dtos/register-account-dto.js"



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

		return {id: result.id}
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
		operationId: "delete-domain",
		description: "Deletes the user's domain",
		tags:        ['account'],
	}) @Post('delete-domain')
	async deleteAccount(): Promise<string> {
		return "delete-domain"
	}
}