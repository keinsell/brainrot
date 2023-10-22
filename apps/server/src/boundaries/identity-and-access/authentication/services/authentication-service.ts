import {Injectable}     from "@nestjs/common"
import {AccountService} from "../../account/services/account.service.js"



@Injectable()
export class AuthenticationService {
	constructor(private readonly accountService: AccountService) {
	}

	public async authenticate(username: string, password: string) {
		const validateCreds = await this.accountService.validateCredentials(username, password)
		console.log(validateCreds)
	}

	public async refreshToken(refreshToken: string): Promise<string> {
		return "refreshToken"
	}
}