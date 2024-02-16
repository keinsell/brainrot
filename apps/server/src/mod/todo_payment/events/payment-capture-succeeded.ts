import {Event}   from "../../../kernel/libraries/message/event.js";
import {Payment} from "../payment.js";


export class PaymentCaptureSucceeded
	extends Event {
	constructor(public readonly payment : Payment) {
		super({
			      namespace: "payment.capture.success",
			      body     : payment.id,
		      })
	}
}