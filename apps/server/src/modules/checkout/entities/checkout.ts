// Do started checkout should snapshot cart?
export interface Checkout {
	id: string
	cartId: string
	userId: string
	status: "INITIATED" | "COMPLETED" | "AWAITING_PAYMENT" | "PAID" | "CANCELLED"
}