import {Injectable} from "@nestjs/common"



@Injectable()
export class AccountService {
	/**
	 * Validates the credentials of a user.
	 *
	 * @param {string} username - The username of the user.
	 * @param {string} password - The password of the user.
	 * @returns {Promise<any>} - A promise that resolves with the validation result.
	 */
	public validateCredentials(username: string, password: string): Promise<any> {
		return;
	}
}