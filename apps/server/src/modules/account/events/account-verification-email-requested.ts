import {Event}   from "../../../common/_unknown_lib/message/event.js"
import {Account} from "../entities/account.js"



export class AccountVerificationEmailRequested extends Event<{ accountId: string }> {
	constructor(account: Account) {
		super({
			namespace: "account.verification.requested",
			body:      {accountId: account.id},
		})
	}
}