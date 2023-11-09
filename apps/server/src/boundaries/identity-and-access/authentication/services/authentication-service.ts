import {CredentialValidator} from "@boundary/identity-and-access/account/shared-kernel/credential-validator/credential-validator.js"
import {Injectable}          from "@nestjs/common"



@Injectable()
export class AuthenticationService {

	constructor(
		private creadentialValidator: CredentialValidator,
	) {}
	public async authenticate(username: string, password: string) {
		const isValid = await this.creadentialValidator.validateCredentials(username, password)

		if (!isValid) {
			throw new Error("Invalid credentials")
		}

		return "accessToken"
	}

	public async refreshToken(refreshToken: string): Promise<string> {
		return "refreshToken"
	}
}