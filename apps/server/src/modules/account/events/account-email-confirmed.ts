import {Event} from "../../../common/_unknown_lib/message/event.js"



export interface AccountEmailConfirmedPayload {
	accountId: string
}


export class AccountEmailConfirmed extends Event<AccountEmailConfirmedPayload> {
	constructor(account: AccountEmailConfirmedPayload) {
		super({
			namespace: "account.verification.completed",
			body:      account,
		})
	}
}