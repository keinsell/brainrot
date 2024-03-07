export interface ProfileMetadata {
	/**
	 * Reference to the customer in the Stripe as per https://stripe.com/docs/api/customers
	 * Exists as virtual link between "profileId" in Stripe's Customer Metadata and "stripeCustomerId" in Profile
	 * @example "cus_1234567890"
	 */
	stripeCustomerId?: string
}