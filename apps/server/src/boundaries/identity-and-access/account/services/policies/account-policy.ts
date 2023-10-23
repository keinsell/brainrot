import {Email}      from "@boundary/identity-and-access/account/domain/value-objects/email.js"
import {Username}   from "@boundary/identity-and-access/account/domain/value-objects/username.js"
import {Injectable} from "@nestjs/common"



@Injectable()
export class AccountPolicy {
	public mustHaveUniqueUsername(username: Username) {
		console.log(username)
	}

	public shouldHaveUniqueEmail(email: Email) {}

	public shouldHaveSecurePassword() {}

	merge(...args: any[]): any {
		return;
	}
}