import {Event}   from "../../../common/libraries/message/event.js";
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