import {Account}               from "@boundary/identity-and-access/modules/account/30-domain/aggregates/account.js"
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util.js"
import {Event}                 from "../../../../../../common/libraries/message/event.js"



export class AccountAuthenticated extends Event {
	constructor(public account: Account) {
		super(
			randomStringGenerator(),
		)
	}
}