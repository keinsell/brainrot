import {Injectable, Logger}           from "@nestjs/common"
import {OnEvent}                      from "@nestjs/event-emitter"
import {EventBus}                     from "../../../../common/infrastructure/messaging/event-bus.js"
import {AccountRegistered}            from "../events/account-registered.js"
import {AccountVerificationEmailSent} from "../events/account-verification-email-sent.js"
import {AccountRepository}            from "../repositories/account-repository.js"



@Injectable()
export class AccountVerification {
	private logger: Logger
	private accountRepository: AccountRepository
	private publisher: EventBus


	constructor(accountRepository: AccountRepository, eventBus: EventBus) {
		this.logger            = new Logger("account::verification::service")
		this.accountRepository = accountRepository
		this.publisher         = eventBus
	}


	public async sendVerificationEmail(accountId: string): Promise<void> {
		const account = await this.accountRepository.getById(accountId)

		// Create secret code for email
		const verificationSecret = Math.random()

		// Save verificationSecret
		this.logger.warn(`Missing implementation for saving verificationSecret (${accountId} => ${verificationSecret})`)

		// Send verification email
		this.logger.warn(`Missing implementation to send email for ${account.email.address}`)

		// Emit verification email sent event
		const emailVerificationSentEvent = new AccountVerificationEmailSent(account)
		await this.publisher.publish(emailVerificationSentEvent)
	}


	public async resendVerificationEmail(accountId: string): Promise<void> {
	}


	public async verifyEmail(code: string): Promise<void> {}


	@OnEvent("account.registered")
	private async onAccountRegistered(event: AccountRegistered): Promise<void> {
		this.logger.verbose(`Handling ${event.id} with "onAccountRegistered": ${JSON.stringify(event)}`)
		await this.sendVerificationEmail(event.body.accountId)
		this.logger.debug(`Handled ${event.id} with "onAccountRegistered"`)
	}
}