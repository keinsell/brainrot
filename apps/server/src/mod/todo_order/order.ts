export interface Order {
	id: string
	/** Order's name is a user-friendly identifier for the order, such as "Order #1234". This is purely for
	 *  alternative identification purposes when interacting with support. */
	name: string
	customerId: string
	createdAt: Date
	updatedAt: Date
	/** The status of the order. */
	status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED" | "REFUNDED" | "RETURNED"
}