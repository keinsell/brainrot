import {Event}   from "../../../../common/_unknown_lib/message/event.js"
import {Account} from "../account.js"



export class AccountVerificationEmailSent extends Event<Account> {
	constructor(account: Account) {
		super({
			namespace: "account.verification.sent",
			body:      account,
		})
	}
}