import {Event}   from "../../../common/_unknown_lib/message/event.js"
import {Account} from "../account.js"



export class AccountRegistered extends Event<Account> {
	constructor(public account: Account) {
		super(
			{
				namespace: "account.registered",
				body:      account,
			},
		)
	}
}