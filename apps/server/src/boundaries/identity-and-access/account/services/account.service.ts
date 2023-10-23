import {Identity}      from "@boundary/identity-and-access/account/domain/entities/identity.js"
import {Email}         from "@boundary/identity-and-access/account/domain/value-objects/email.js"
import {Password}      from "@boundary/identity-and-access/account/domain/value-objects/password.js"
import {Username}      from "@boundary/identity-and-access/account/domain/value-objects/username.js"
import {AccountPolicy} from "@boundary/identity-and-access/account/services/policies/account-policy.js"
import {Injectable}    from "@nestjs/common"



@Injectable()
export class AccountService {
	constructor(private policy: AccountPolicy) {}


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


	public async register(accountPayload: {
		username: string; email: string; password: string;
	}): Promise<any> {
		const username = accountPayload.username as unknown as Username;
		const email    = accountPayload.email as unknown as Email;
		const password = accountPayload.password as unknown as Password;

		const identity = Identity.RegisterAccount({
			username: username,
			email:    email,
			password: password,
		});

		this.policy.merge(this.policy.mustHaveUniqueUsername(identity.username), this.policy.shouldHaveUniqueEmail(identity.email), this.policy.shouldHaveSecurePassword())

		identity.registerAccount()

		// TODO: Publish event

		return;

	}
}