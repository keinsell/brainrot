import {Payment}    from "@boundary/billing/domain/payment.js"
import {randomUUID} from "node:crypto"
import {Event}      from "../../../../common/libraries/message/event.js"



export class PaymentInitiated extends Event {
	constructor(
		public readonly payment: Payment,
	) {super(randomUUID())}
}