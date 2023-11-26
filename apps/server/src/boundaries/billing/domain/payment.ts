export interface Payment {
	id: string
	accountId: string
	amount: number
	currency: string
	billingAddress?: any
	shippingAddress: any
}