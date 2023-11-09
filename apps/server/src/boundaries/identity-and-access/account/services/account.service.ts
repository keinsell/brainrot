import {Account}                             from "@boundary/identity-and-access/account/domain/aggregates/account.js"
import {AccountPolicy}                       from "@boundary/identity-and-access/account/domain/policies/account-policy.js"
import {IdentityRepository}                  from "@boundary/identity-and-access/account/domain/repositories/identity-repository.js"
import {Email}                               from "@boundary/identity-and-access/account/domain/value-objects/email.js"
import {Password}                            from "@boundary/identity-and-access/account/domain/value-objects/password.js"
import {Username}                            from "@boundary/identity-and-access/account/domain/value-objects/username.js"
import {PasswordHashing}                     from "@libraries/security/password-hashing/password-hashing.js"
import {Injectable, NotImplementedException} from "@nestjs/common"
import {EventBus}                            from "../../../../infrastructure/messaging/event-bus.js"



@Injectable()
export class AccountService {
	constructor(private policy: AccountPolicy, private repository: IdentityRepository, private hashingStrategy: PasswordHashing) {}


	/**
	 * Validates the credentials of a user.
	 *
	 * @param {string} username - The username of the user.
	 * @param {string} password - The password of the user.
	 * @returns {Promise<any>} - A promise that resolves with the validation result.
	 */
	public validateCredentials(username: string, password: string): Promise<any> {
		throw new NotImplementedException(username, password)
	}


	public async register(accountPayload: {
		username: string; email: string; password: string;
	}): Promise<{ id: any; email: string; username: string }> {

		// TODO: Create factories for value objects?

		const username = accountPayload.username as Username;

		const email = {
			isVerified: false,
			address:    accountPayload.email,
		} as Email;

		const password = await Password.fromPlain(accountPayload.password, this.hashingStrategy);

		let identity = Account.RegisterAccount({
			username: username,
			email:    email,
			password: password,
		});

		const maybePolicy = this.policy.merge(await this.policy.isUniqueEmail(identity.email), await this.policy.isUniqueUsername(identity.username), await this.policy.shouldHaveSecurePassword(identity.password))

		if (maybePolicy.isErr()) {
			throw maybePolicy._unsafeUnwrapErr()
		}

		identity = identity.registerAccount()

		await new EventBus().publish(identity.getUncommittedEvents())

		identity = await this.repository.save(identity)

		return {
			id:       identity.id,
			username: identity.username,
			email:    identity.email.address,
		}
	}
}