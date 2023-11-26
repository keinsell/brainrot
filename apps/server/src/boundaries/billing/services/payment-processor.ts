import {Payment} from "@boundary/billing/domain/payment.js"



export interface PaymentProcessor {
	/**
	 * @example "Stripe"
	 */
	PAYMENT_PROCESSOR_ID: string

	createPayment(payment: any): Promise<Payment>
}