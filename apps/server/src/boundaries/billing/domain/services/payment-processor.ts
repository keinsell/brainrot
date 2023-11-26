import {Payment}                    from "@boundary/billing/domain/entities/payment.js"
import {PaymentProcessorIdentifier} from "@boundary/billing/domain/value-objects/payment-processor-identifier.js"



export interface PaymentProcessor {
	/**
	 * @example "Stripe"
	 */
	PAYMENT_PROCESSOR_ID: PaymentProcessorIdentifier

	createPayment(payment: any): Promise<Payment>
}