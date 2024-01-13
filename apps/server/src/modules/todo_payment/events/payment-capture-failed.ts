import {Event}   from "../../../common/libraries/message/event.js";
import {Payment} from "../payment.js";


export class PaymentCaptureFailed
	extends Event {
	constructor(public readonly payment : Payment) {
		super({
			      namespace: "payment.capture.failed",
			      body     : payment.id,
		      })
	}
}