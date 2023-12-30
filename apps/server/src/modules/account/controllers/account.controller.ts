import {Body, Controller, Patch, Post, Req, UseGuards} from "@nestjs/common"
import {ApiOkResponse, ApiOperation}                   from "@nestjs/swagger"
import {readFileSync}                                  from 'node:fs'
import {dirname}                                       from "path"
import {fileURLToPath}                                 from "url"
import {JwtAuthorizationGuard}                         from "../../authentication/guards/jwt-authorization-guard.js"
import {RegisterAccount2, RegisterAccountDtp}          from "../commands/register-account-dtp.js"
import {AccountService}                                from "../services/account-service.js"
import {AccountViewModel}                              from "../view-model/account-view-model.js"
import typia                                           from "typia";
import Sentry                                          from "@sentry/node";
import {Request}                                       from "express";



function getOperationDocumentation(operation : string) : string {
	const __filename         = fileURLToPath(import.meta.url);
	const __dirname          = dirname(__filename);
	const docsDirectory      = `${__dirname}/../10-application/docs`
	const operationDirectory = `${docsDirectory}/operations`

	try {
		return readFileSync(`${operationDirectory}/${operation}.md`, "utf8")
		//return import(`${operationDirectory}/${operation}.md`) as string
	}
	catch (e) {
		return ''
	}
}


@Controller("account")
export class AccountController {
	constructor(private service : AccountService) {
	}


	@ApiOperation({
		operationId: "register", summary: "Register account",
		description: getOperationDocumentation("register"), tags: ['account'],
	})
	@ApiOkResponse({
		type       : AccountViewModel,
		description: "Account was successfully registered in system.",
	})
	@Post()
	async register(
		@Req() request : Request,
		@Body() registerAccountBody : RegisterAccountDtp,
	) : Promise<AccountViewModel> {
		const body = typia.assert<RegisterAccount2>(registerAccountBody)

		Sentry.setUser({
			ip_address: request.ip,
		})

		// TODO: Normalize Email
		// TODO: Normalize Username

		const result = await this.service.register({
			username: body.username, email: body.email, password: body.password,
		})

		Sentry.setUser({
			username  : result.username,
			email     : result.email.address,
			ip_address: request.ip,
		})

		return {
			id           : result.id, email: result.email.address,
			emailVerified: result.email.isVerified, username: result.username,
		}
	}


	@UseGuards(JwtAuthorizationGuard)
	@ApiOperation({
		operationId: "update-account",
		description: "Update details of account.", tags: ['account'],
	})
	@Patch()
	async updateAccount() : Promise<string> {
		// Find a account that needs to be updated
		return "change-password"
	}

	@UseGuards(JwtAuthorizationGuard) @ApiOperation({
		operationId: "delete-account",
		description: "Deletes the user's account.", tags: ['account'],
	})
	@Post('delete-account')
	async deleteAccount() : Promise<string> {
		return "delete-domain"
	}
}