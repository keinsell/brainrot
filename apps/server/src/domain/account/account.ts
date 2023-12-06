import {AggregateRoot, AggregateRootProperties} from "../../common/libraries/domain/aggregate.js"
import {AccountEvent}                           from "./events/account-event.js"
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
		return new Account({
			...payload,
			status:   AccountStatus.INACTIVE,
			password: payload.password,
		}).register()
	}


	static CreateAccount(payload: IdentityProperties) {
		return new Account(payload)
	}


	public changeUsername(username: Username) {
		this.username = username
		// TODO: Add UsernameChangedEvent
		return this
	}


	public requestPasswordReset() {}


	public resetPassword() {}


	public changeEmail(email: Email) {
		this.email = email
		return this
	}


	public changePassword() {}


	public deleteAccount() {}


	public verifyEmail() {}


	public register(): Account {
		this.appendEvent(new AccountEvent.Registred(this))
		return this;
	}


	public authenticate(): Account {
		return this
	}
}