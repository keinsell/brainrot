import {BadRequestException}                    from "@nestjs/common"
import {AggregateRoot, AggregateRootProperties} from "../../../common/libraries/domain/aggregate.js"
import {AccountEmailConfirmed}                  from "./events/account-email-confirmed.js"
import {AccountEvent}                           from "./events/account-event.js"
import {AccountVerificationEmailRequested}      from "./events/account-verification-email-requested.js"
import {AccountStatus}                          from "./value-objects/account-status.js"
import {Email}                                  from "./value-objects/email.js"
import {Password}                               from "./value-objects/password.js"
import {Username}                               from "./value-objects/username.js"



export interface IdentityProperties extends AggregateRootProperties {
	email: Email
	password: Password
	username: Username
	status: AccountStatus
}


export class Account extends AggregateRoot implements IdentityProperties {
	public email: Email
	public password: Password
	public status: AccountStatus
	public username: Username

	public readonly usernameFields: any = ["username", "email"]


	private constructor(payload: IdentityProperties) {
		super({
			...payload,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
		this.email    = payload.email
		this.username = payload.username
		this.password = payload.password
	}


	static RegisterAccount(payload: Omit<IdentityProperties, 'status'>) {
		let account = new Account({
			...payload,
			status:   AccountStatus.INACTIVE,
			password: payload.password,
		})

		account = account.register()

		return account
	}


	static build(payload: IdentityProperties) {
		return new Account(payload)
	}


	public changeUsername(username: Username) {
		this.username = username
		// TODO: Add UsernameChangedEvent
		return this
	}


	public requestPasswordReset() {}


	public requestVerificationEmail() {
		const event = new AccountVerificationEmailRequested(this)
		this.appendEvent(event);
		return this
	}


	public resetPassword() {}


	public changeEmail(email: Email) {
		this.email = email
		return this
	}


	public changePassword() {}


	public deleteAccount() {}


	public verifyEmail() {
		if (this.email.isVerified) {
			throw new BadRequestException("Email is already verified.")
		}

		this.email.isVerified = true

		const event = new AccountEmailConfirmed({accountId: this.id})
		this.appendEvent(event)

		return this
	}


	public register(): Account {
		this.appendEvent(new AccountEvent.Registred({
			accountId: this.id,
		}))
		return this;
	}


	public authenticate(): Account {
		return this
	}
}