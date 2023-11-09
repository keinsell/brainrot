import {Injectable}          from "@nestjs/common"
import {CredentialValidator} from "src/boundaries/identity-and-access/account/shared-kernel/credential-validator/credential-validator.js"



@Injectable()
export class AuthenticationService {
	constructor(private readonly credentialValidator: CredentialValidator) {
	}

	public async authenticate(username: string, password: string) {
		const validateCreeds = await this.credentialValidator.validateCredentials(username, password)

		console.log(validateCreeds)
	}

	public async refreshToken(refreshToken: string): Promise<string> {
		return "refreshToken"
	}
}