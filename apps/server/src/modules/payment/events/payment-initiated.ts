import {Event}   from "../../../common/_unknown_lib/message/event.js"
import {Payment} from "../payment.js"



export class PaymentInitiated extends Event {
	constructor(public readonly payment: Payment) {
		super({
			namespace: "payment.initiated",
			body:      payment,
		})
	}
}