import {Injectable, Logger} from "@nestjs/common"
import {EventBus}           from "../../../../common/infrastructure/messaging/event-bus.js"
import {ServiceAbstract}    from "../../../../common/libraries/services/service-abstract.js"
import {PasswordHashing}    from "../../../../common/libraries/unihash/index.js"
import {KdfAlgorithm}       from "../../../../common/libraries/unihash/key-derivation-functions/key-derivation-function.js"
import {RegisterAccountDto} from "../../dtos/register-account-dto.js"
import {Account}            from "../account.js"
import {AccountPolicy}      from "../policies/account-policy.js"
import {AccountRepository}  from "../repositories/account-repository.js"
import {Email}              from "../value-objects/email.js"
import {Password}           from "../value-objects/password.js"



@Injectable()
export class AccountService extends ServiceAbstract<Account> {
	private logger: Logger = new Logger("account::service")


	constructor(private policy: AccountPolicy, private repository: AccountRepository, private hashing: PasswordHashing) {
		super(repository)
	}


	/**
	 * # `register-account`
	 *
	 * Register account is operation dedicated for creating new accounts in codebase.
	 *
	 * @param {RegisterAccountDto} registerAccount
	 * @returns {Promise<Account>}
	 */
	public async register(registerAccount: RegisterAccountDto): Promise<Account> {
		const email = {
			isVerified: false,
			address:    registerAccount.email.toLowerCase(),
		} as Email;

		const password = await Password.fromPlain(registerAccount.password, this.hashing.use(KdfAlgorithm.Argon2id));

		await this.policy.canRegisterAccount({
			email:    email.address,
			password: password.plain!,
			username: registerAccount.username.toLowerCase(),
		})

		let identity = Account.RegisterAccount({
			username: registerAccount.username.toLowerCase(),
			email:    email,
			password: password,
		});

		const events = identity.getUncommittedEvents()

		identity = await this.repository.save(identity)

		await new EventBus().publishAll(events)

		this.logger.log(`Account ${identity.id} was successfully registered.`)

		return identity
	}
}