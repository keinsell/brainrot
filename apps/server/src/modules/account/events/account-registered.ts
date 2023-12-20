import {Event} from "../../../common/libraries/message/event.js"



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