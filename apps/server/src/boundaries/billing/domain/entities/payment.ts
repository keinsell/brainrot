import {PaymentProcessorIdentifier} from "@boundary/billing/domain/value-objects/payment-processor-identifier.js"



export interface Payment {
	id: string
	accountId: string
	processor: PaymentProcessorIdentifier
	amount: number
	currency: string
	billingAddress?: any
	shippingAddress: any
	// If processor is Stripe data filed should have StripeData type and if is manual should have ManualData type
	_paymentReference?: any

	initiate(): void
	authorize(): void
	capture(): void
	failure(): void
	cancel(): void
	refund(): void
	retry(): void
}