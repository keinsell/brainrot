import {CredentialValidator} from "@boundary/identity-and-access/account/shared-kernel/credential-validator/credential-validator.js"
import {Injectable}          from "@nestjs/common"



@Injectable()
export class AuthenticationService {

	constructor(private credentialValidator: CredentialValidator) {}


	public async authenticate(username: string, password: string) {
		const isValid = await this.credentialValidator.validateCredentials(username, password)

		if (isValid.isErr()) {
			throw isValid.error
		}

		return "accessToken"
	}


	public async refreshToken(refreshToken: string): Promise<string> {
		return "refreshToken"
	}
}