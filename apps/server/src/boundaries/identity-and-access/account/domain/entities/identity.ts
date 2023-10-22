import {RecursiveKeyOf} from "nestjs-cls/dist/src/types/recursive-key-of.type.js"
import {Email}          from "../value-objects/email.js"
import {Password}       from "../value-objects/password.js"
import {Username}       from "../value-objects/username.js"



export interface IdentityProperties {
	email: Email
	password: Password
	username: Username
}


export class Identity implements IdentityProperties {

	public email: Email

	public password: Password

	public username: Username

	public readonly usernameFields: RecursiveKeyOf<Identity> = ["username", "email"]

	private constructor(payload: IdentityProperties) {
		this.email    = payload.email
		this.username = payload.email.address
		this.password = payload.password
	}

	static registerAccount(payload: IdentityProperties) {
		const identity = new Identity(payload)
		// Execute register account method
	}

	static CreateAccount(payload: IdentityProperties) {
		return new Identity(payload)
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
}