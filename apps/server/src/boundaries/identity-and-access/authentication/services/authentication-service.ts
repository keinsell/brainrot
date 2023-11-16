import {
	CredentialValidator,
}                   from "@boundary/identity-and-access/account/shared-kernel/credential-validator/credential-validator.js"
import {
	TokenManagement,
}                   from "@boundary/identity-and-access/authentication/services/token-management.js"
import {Injectable} from "@nestjs/common"
import {ok, Result} from "neverthrow"



@Injectable()
export class AuthenticationService {

	constructor(private credentialValidator: CredentialValidator, private tokenManagement: TokenManagement) {}


	public async authenticate(username: string, password: string): Promise<Result<{
		accountId: string,
		accessToken: string, refreshToken: string,
	}, any>> {
		const isValid = await this.credentialValidator.validateCredentials(username, password)

		if (isValid.isErr()) {
			throw isValid.error
		}

		const account = isValid.value

		const accessToken  = await this.tokenManagement.generateAccessToken({username: username})
		const refreshToken = await this.tokenManagement.generateRefreshToken({username: username})

		return ok({
			accountId: account.id,
			accessToken:  accessToken,
			refreshToken: refreshToken,
		})
	}

	public async  logout(): Promise<void> {
		return Promise.resolve(undefined)
	}


	public async refreshToken(refreshToken: string): Promise<string> {
		return "refreshToken"
	}
}