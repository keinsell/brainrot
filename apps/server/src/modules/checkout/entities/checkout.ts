// Do started checkout should snapshot cart?
export interface Checkout {
	id: string
	cartId: string
	userId: string
	paymentId: string
	status: "INITIATED" | "COMPLETED" | "AWAITING_PAYMENT" | "PAID" | "CANCELLED"
}