import {Account}           from "@boundary/identity-and-access/modules/account/30-domain/aggregates/account.js"
import {AccountPolicy}     from "@boundary/identity-and-access/modules/account/30-domain/policies/account-policy.js"
import {AccountRepository} from "@boundary/identity-and-access/modules/account/30-domain/repositories/account-repository.js"
import {Email}             from "@boundary/identity-and-access/modules/account/30-domain/value-objects/email.js"
import {Password}          from "@boundary/identity-and-access/modules/account/30-domain/value-objects/password.js"
import {Username}          from "@boundary/identity-and-access/modules/account/30-domain/value-objects/username.js"
import {UnifiedHashing}    from "@lib/security/hashing/index.js"
import {KdfAlgorithm}      from "@lib/security/hashing/key-derivation-functions/key-derivation-function.js"
import {Injectable}        from "@nestjs/common"
import {EventBus}          from "../../../../../common/infrastructure/messaging/event-bus.js"



@Injectable()
export class AccountService {
	constructor(private policy: AccountPolicy, private repository: AccountRepository, private hashing: UnifiedHashing) {}


	public async register(accountPayload: {
		username: string; email: string; password: string;
	}): Promise<{ id: any; email: string; username: string }> {
		const username = accountPayload.username as Username;

		const email = {
			isVerified: false,
			address:    accountPayload.email,
		} as Email;

		const password = await Password.fromPlain(accountPayload.password, this.hashing.use(KdfAlgorithm.Argon2id));

		let identity = Account.RegisterAccount({
			username: username,
			email:    email,
			password: password,
		});

		const maybePolicy = this.policy.merge(await this.policy.isUniqueEmail(identity.email), await this.policy.isUniqueUsername(identity.username), await this.policy.shouldHaveSecurePassword(identity.password))

		if (maybePolicy.isErr()) {
			throw maybePolicy._unsafeUnwrapErr()
		}

		await new EventBus().publish(identity.getUncommittedEvents())

		identity = await this.repository.save(identity)

		return {
			id:       identity.id,
			username: identity.username,
			email:    identity.email.address,
		}
	}
}