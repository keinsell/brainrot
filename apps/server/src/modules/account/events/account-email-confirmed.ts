import {Event} from "../../../common/libraries/message/event.js"



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