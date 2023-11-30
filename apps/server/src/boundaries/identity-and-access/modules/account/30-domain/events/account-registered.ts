import {Account}               from "@boundary/identity-and-access/modules/account/30-domain/aggregates/account.js"
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util.js"
import {Event}                 from "../../../../../../common/_unknown_lib/message/event.js"



export class AccountRegistered extends Event {
	constructor(public account: Account) {
		super(
			randomStringGenerator(),
		)
	}
}