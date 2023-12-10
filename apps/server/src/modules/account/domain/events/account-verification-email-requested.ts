import {Event}   from "../../../../common/_unknown_lib/message/event.js"
import {Account} from "../account.js"



export class AccountVerificationEmailRequested extends Event<Account> {
	constructor(account: Account) {
		super({
			namespace: "account.verification.requested",
			body:      account,
		})
	}
}