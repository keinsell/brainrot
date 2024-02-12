import {Inject, Injectable, Logger} from '@nestjs/common'
import {ServiceAbstract}            from '../../../common/libraries/services/service-abstract.js'
import {PasswordHashing}            from '../../../common/libraries/unihash/index.js'
import {EventBus}                   from '../../../common/modules/messaging/event-bus.js'
import {Tracer}                     from "../../../common/modules/observability/tracing/tracer.js"
import {RegisterAccountCommand}     from '../commands/register-account/register-account-command.js'
import {RegisterAccountUseCase}     from "../commands/register-account/register-account-usecase.js"
import {AccountSelfService}         from '../contract/account-self-service.js'
import {Account}                    from '../entities/account.js'
import {AccountPolicy}              from '../policies/account-policy.js'
import {AccountRepository}          from '../repositories/account-repository.js'



@Injectable()
export class AccountService extends ServiceAbstract<Account> implements AccountSelfService {
	@Inject(Tracer) private tracer: Tracer
	private logger: Logger = new Logger('account::service')


	constructor(private policy: AccountPolicy, private repository: AccountRepository, private hashing: PasswordHashing, private eventbus: EventBus, private registerAccountUsecase: RegisterAccountUseCase) {
		super(repository)
	}


	public closeAccount(accountId: string): Promise<void> {
		throw new Error('Method not implemented.')
	}


	/**
	 * # `register-account`
	 *
	 * Register account is an operation dedicated to creating new accounts
	 * in codebase.
	 *
	 * @param {RegisterAccountCommand} registerAccount
	 * @returns {Promise<Account>}
	 */
	async register(registerAccount: RegisterAccountCommand): Promise<Account> {
		const account = await this.registerAccountUsecase.execute(registerAccount)

		if (account.isErr()) {
			throw account.error
		}

		return account.value
	}


	public updateAccount(accountId: string, updateAccount: RegisterAccountCommand): Promise<Account> {
		throw new Error('Method not implemented.')
	}
}