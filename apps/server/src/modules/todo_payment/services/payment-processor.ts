import {Payment}                    from "../payment.js"
import {PaymentProcessorIdentifier} from "../value-objects/payment-processor-identifier.js"



export interface PaymentProcessor {
	/**
	 * @example "Stripe"
	 */
	PAYMENT_PROCESSOR_ID: PaymentProcessorIdentifier

	createPayment(payment: any): Promise<Payment>
}