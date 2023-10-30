import {AggregateRoot} from "../../../../../externals/libs/domain/aggregate.js"
import {Email}         from "../value-objects/email.js"
import {Password}      from "../value-objects/password.js"
import {Username}      from "../value-objects/username.js"



export interface IdentityProperties {
	id: string
	email: Email
	password: Password
	username: Username
}


export class Account extends AggregateRoot implements IdentityProperties {
	public email: Email
	id: string
	public password: Password

	public username: Username

	public readonly usernameFields: any = ["username", "email"]


	private constructor(payload: IdentityProperties) {
		super()
		this.id       = payload.id
		this.email    = payload.email
		this.username = payload.email.address
		this.password = payload.password
	}


	static RegisterAccount(payload: IdentityProperties) {
		return new Account(payload)
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


	public registerAccount(): Account {
		return this;
	}
}