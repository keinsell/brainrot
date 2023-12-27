export interface PromotionCode {
	id: string
	amountOff: number | undefined
	percentOff: number | undefined
	createdAt: Date
	duration: "repeating"
	durationInMonths: number
	maxRedemptions: number | null
	name: string | null
	restrictions: {
		firstTimeTransaction?: boolean
		minimumAmount?: number
		minimumAmountCurrency?: string
	}
	timesRedeemed: number
}