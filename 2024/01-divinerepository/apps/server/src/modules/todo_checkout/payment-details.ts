export interface PaymentDetails {
	paymentDetailsId: string
	checkoutId: string
	paymentMethod: "CREDIT_CARD" | "PAYPAL"
	pamentStatus: "INITIATED" | "COMPLETED" | "AWAITING_PAYMENT" | "PAID" | "CANCELLED"
	amount: number
}