import {Inject, Injectable, Logger} from "@nestjs/common"
import {SpanKind}                   from "@opentelemetry/api"
import {setUser}                    from "@sentry/node"
import {ok, Result}                 from "neverthrow"
import {PasswordHashing}            from "../../../../common/libraries/unihash/index.js"
import {KdfAlgorithm}               from "../../../../common/libraries/unihash/key-derivation-functions/key-derivation-function.js"
import {createEmailAddress}         from "../../../../common/modules/communication/mailer/value-object/email-address.js"
import {EventBus}                   from "../../../../common/modules/messaging/event-bus.js"
import {Tracer}                     from "../../../../common/modules/observability/tracing/tracer.js"
import {UseCase}                    from "../../../../common/use-case.js"
import {Account}                    from "../../entities/account.js"
import {AccountPolicy}              from "../../policies/account-policy.js"
import {AccountRepository}          from "../../repositories/account-repository.js"
import {AccountEmail}               from "../../value-objects/account-email.js"
import {Password}                   from "../../value-objects/password.js"
import {createUsername}             from "../../value-objects/username.js"
import {RegisterAccountCommand}     from "./register-account-command.js"



@Injectable()
export class RegisterAccountUseCase extends UseCase<RegisterAccountCommand, Account> {
	private logger: Logger = new Logger('account::usecase::register-account')
	private repository: AccountRepository
	private policy: AccountPolicy
	private hashing: PasswordHashing
	@Inject(Tracer) private tracer: Tracer
	private eventbus: EventBus


	constructor(repository: AccountRepository, policy: AccountPolicy, hashing: PasswordHashing, eventbus: EventBus) {
		super()
		this.repository = repository
		this.policy     = policy
		this.hashing    = hashing
		this.eventbus   = eventbus
	}


	public async execute(input: RegisterAccountCommand): Promise<Result<Account, never>> {
		const span = this.tracer.startSpan('com.methylphenidate.account.service.register', {
			kind:       SpanKind.INTERNAL,
			attributes: {
				op:      "",
				request: JSON.stringify(RegisterAccountCommand),
			},
		})

		this.logger.debug('Validating inputs...', {command: input})

		this.logger.debug("Checking if email is valid...", {email: input.email})

		const emailResult = createEmailAddress(input.email)

		if (emailResult.isErr()) {
			this.tracer.recordException(emailResult.error)
			span.end()
			throw emailResult.error
		}

		this.logger.debug(`Provided email is valid.`, {email: emailResult.value})

		this.logger.debug("Checking if username is valid...", {username: input.username})

		const usernameResult = createUsername(input.username)

		if (usernameResult.isErr()) {
			span.end()
			span.recordException(usernameResult.error)
			throw usernameResult.error
		}

		this.logger.debug(`Provided username is valid.`, {username: usernameResult.value})

		const username = usernameResult.value
		const email    = emailResult.value

		const accountEmail = AccountEmail.create({
			isVerified: false,
			address:    email,
		})

		const password = await Password.fromPlain(input.password, this.hashing.use(KdfAlgorithm.Argon2id))

		span.setAttribute('user.password', password.toString())

		await this.policy.canRegisterAccount({
			email:    accountEmail.address,
			password: input.password,
			username: username,
		})

		this.logger.debug('Creating aggregate...')

		let identity = Account.RegisterAccount({
			username: username,
			email:    accountEmail,
			password: password,
			groups:   [],
		})

		const events = identity.getUncommittedEvents()

		this.logger.debug('Saving aggregate...')

		identity = await this.repository.save(identity)

		this.logger.debug('Publishing events...')

		await this.eventbus.publishAll(events)

		this.logger.log(`Account was successfully registered.`, identity)

		setUser({
			email:    identity.email.address,
			username: identity.username,
			id:       identity.id,
		})

		span.end()

		return ok(identity)
	}

}