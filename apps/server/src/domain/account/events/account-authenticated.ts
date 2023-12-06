import {Event}   from "../../../common/_unknown_lib/message/event.js"
import {Account} from "../account.js"



export class AccountAuthenticated extends Event<Account> {
	constructor(account: Account) {
		super(
			{
				namespace: "account.authenticated",
				body:      account,
			},
		)
	}
}