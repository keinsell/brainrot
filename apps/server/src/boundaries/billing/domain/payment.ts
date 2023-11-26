export interface Payment {
	id: string
	accountId: string
	amount: number
	currency: string
	billingAddress?: any
	shippingAddress: any

	initiate(): void
	capture(): void
	cancel(): void
	refund(): void
	retry(): void
}