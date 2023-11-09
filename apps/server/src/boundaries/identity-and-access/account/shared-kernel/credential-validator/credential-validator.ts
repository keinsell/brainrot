import {AccountService} from "@boundary/identity-and-access/account/services/account.service.js"
import {Injectable}     from "@nestjs/common"



/**
 * This class is responsible for validating credentials. This is exposed by shared-kernel and further used by
 * authentication to encapsulate the logic of validating credentials as authentication do not have access to account itself.
 */
@Injectable()
export class CredentialValidator {
	constructor(
		private accountService: AccountService,
	) {}

	public async validateCredentials(username: string, password: string): Promise<boolean> {
		return await this.accountService.validateCredentials(username, password)
	}
}