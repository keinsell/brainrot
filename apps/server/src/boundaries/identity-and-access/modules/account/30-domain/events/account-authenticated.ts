import {Account}               from "@boundary/identity-and-access/modules/account/30-domain/aggregates/account.js"
import {Event}                 from "@libraries/message/event.js"
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util.js"



export class AccountAuthenticated extends Event {
	constructor(public account: Account) {
		super(
			randomStringGenerator(),
		)
	}
}