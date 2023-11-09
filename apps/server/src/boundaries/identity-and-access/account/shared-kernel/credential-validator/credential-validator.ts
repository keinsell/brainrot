import {Injectable} from "@nestjs/common"



/**
 * This class is responsible for validating credentials. This is exposed by shared-kernel and further used by
 * authentication to encapsulate the logic of validating credentials as authentication do not have access to account itself.
 */
@Injectable()
export class CredentialValidator {
	constructor(
	) {}

	public async validateCredentials(username: string, password: string): Promise<boolean> {
		return true
	}
}