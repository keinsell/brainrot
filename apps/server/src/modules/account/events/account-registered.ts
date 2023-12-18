import {Event} from "../../../common/_unknown_lib/message/event.js"



interface AccountRegisteredPayload {
	accountId: string
}


export class AccountRegistered extends Event<AccountRegisteredPayload> {
	constructor(payload: AccountRegisteredPayload) {
		super({
			namespace: "account.registered",
			body:      payload,
		})
	}
}