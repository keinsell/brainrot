import {Controller, Delete, Post} from "@nestjs/common"
import {ApiOperation}             from "@nestjs/swagger"



@Controller('authenticate')
export class AuthenticationController {
	@ApiOperation({
		operationId: "authenticate",
		description: "Logs the user in",
		tags:        ['account', 'authentication'],
	}) @Post()
	async authenticate(): Promise<string> {
		return "authenticate"
	}

	@ApiOperation({
		operationId: "destroy-session",
		description: "eletes the current session. This effectively logs out the user, and they must reauthenticate to continue using protected resources.",
		tags:        ['account', "session", "authentication"],
	}) @Delete()
	async destroySession(): Promise<string> {
		return "logout"
	}
}