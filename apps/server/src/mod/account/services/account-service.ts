import {Inject, Injectable, Logger} from '@nestjs/common'
import {ServiceAbstract}            from '../../../kernel/libraries/services/service-abstract.js'
import {PasswordHashing}            from '../../../kernel/libraries/unihash/index.js'
import {EventBus}                   from '../../../kernel/modules/messaging/event-bus.js'
import {OpentelemetryTracer}        from '../../../kernel/modules/observability/tracing/opentelemetry/provider/tracer/opentelemetry-tracer.js'
import {AccountSelfService}         from '../_/account-self-service.js'
import {RegisterAccountCommand}     from '../commands/register-account/register-account-command.js'
import {RegisterAccountUseCase}     from "../commands/register-account/register-account-usecase.js"
import {Account}                    from '../entities/account.js'
import {AccountPolicy}              from '../policies/account-policy.js'
import {AccountRepository}          from '../repositories/account-repository.js'



@Injectable()
export class AccountService extends ServiceAbstract<Account> implements AccountSelfService {
	@Inject(OpentelemetryTracer) private tracer: OpentelemetryTracer
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