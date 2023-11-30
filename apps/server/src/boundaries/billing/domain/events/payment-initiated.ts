import {Payment}    from "@boundary/billing/domain/entities/payment.js"
import {randomUUID} from "node:crypto"
import {Event}      from "../../../../common/_unknown_lib/message/event.js"



export class PaymentInitiated extends Event {
	constructor(
		public readonly payment: Payment,
	) {super(randomUUID())}
}