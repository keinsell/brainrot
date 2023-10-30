import {Account}            from "@boundary/identity-and-access/account/domain/entities/account.js"
import {AccountPolicy}      from "@boundary/identity-and-access/account/domain/policies/account-policy.js"
import {IdentityRepository} from "@boundary/identity-and-access/account/domain/repositories/identity-repository.js"
import {Email}              from "@boundary/identity-and-access/account/domain/value-objects/email.js"
import {Password}           from "@boundary/identity-and-access/account/domain/value-objects/password.js"
import {Username}           from "@boundary/identity-and-access/account/domain/value-objects/username.js"
import {Injectable}         from "@nestjs/common"



@Injectable()
export class AccountService {
	constructor(private policy: AccountPolicy, private repository: IdentityRepository) {}


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
	}): Promise<{ id: any; email: string; username: string }> {
		const username = accountPayload.username as Username;
		const email    = {
			isVerified: false,
			address:    accountPayload.email,
		} as Email;
		const password = {
			hash: accountPayload.password,
		} as Password

		let identity = Account.RegisterAccount({
			id:       "",
			username: username,
			email:    email,
			password: password,
		});

		const maybePolicy = this.policy.merge(this.policy.isUniqueEmail(identity.email))

		//if (maybePolicy.isErr()) {
		//	throw maybePolicy._unsafeUnwrapErr()
		//}

		identity = identity.registerAccount()

		// TODO: Publish event

		identity = await this.repository.save(identity)

		return {
			id:       identity.id,
			username: identity.username,
			email:    identity.email.address,
		}
	}
}