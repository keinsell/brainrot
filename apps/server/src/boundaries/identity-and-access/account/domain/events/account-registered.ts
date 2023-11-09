import {Account}               from "@boundary/identity-and-access/account/domain/aggregates/account.js"
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util.js"
import {Event}                 from "../../../../../libraries/message/event.js"



export class AccountRegistered extends Event {
	constructor(public account: Account) {
		super(
			randomStringGenerator()
		)
	}
}