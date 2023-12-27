import {Injectable, Logger} from "@nestjs/common"
import {ServiceAbstract}    from "../../../common/libraries/services/service-abstract.js"
import {PasswordHashing}    from "../../../common/libraries/unihash/index.js"
import {KdfAlgorithm}       from "../../../common/libraries/unihash/key-derivation-functions/key-derivation-function.js"
import {EventBus}           from "../../../common/modules/messaging/event-bus.js"
import {RegisterAccount}    from "../commands/register-account.js"
import {Account}            from "../entities/account.js"
import {AccountPolicy}      from "../policies/account-policy.js"
import {AccountRepository}  from "../repositories/account-repository.js"
import {Email}              from "../value-objects/email.js"
import {Password}           from "../value-objects/password.js"



@Injectable()
export class AccountService extends ServiceAbstract<Account> {
	private logger: Logger = new Logger("account::service")


	constructor(private policy: AccountPolicy, private repository: AccountRepository, private hashing: PasswordHashing, private eventbus: EventBus) {
		super(repository)
	}


	/**
	 * # `register-account`
	 *
	 * Register account is an operation dedicated to creating new accounts in codebase.
	 *
	 * @param {RegisterAccount} registerAccount
	 * @returns {Promise<Account>}
	 */
	public async register(registerAccount: RegisterAccount): Promise<Account> {
		const email = Email.create({
			isVerified: false,
			address:    registerAccount.email.toLowerCase(),
		})

		const password = await Password.fromPlain(registerAccount.password, this.hashing.use(KdfAlgorithm.Argon2id));

		await this.policy.canRegisterAccount({
			email:    email.address,
			password: password.plain,
			username: registerAccount.username.toLowerCase(),
		})

		let identity = Account.RegisterAccount({
			username: registerAccount.username.toLowerCase(),
			email:    email,
			password: password,
		});

		const events = identity.getUncommittedEvents()

		identity = await this.repository.save(identity)

		await this.eventbus.publishAll(events)

		this.logger.log(`Account ${identity.id} was successfully registered.`)

		return identity
	}
}