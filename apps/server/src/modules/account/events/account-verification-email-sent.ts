import {Event}   from "../../../common/libraries/message/event.js"
import {Account} from "../entities/account.js"



export class AccountVerificationEmailSent extends Event<Account> {
	constructor(account: Account) {
		super({
			namespace: "account.verification.sent",
			body:      account,
		})
	}
}