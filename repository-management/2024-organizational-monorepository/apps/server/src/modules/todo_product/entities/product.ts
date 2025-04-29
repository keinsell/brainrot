export class Product {
	id: string
	// The product’s name, meant to be displayable to the customer.
	name: string
	// The product’s description, meant to be displayable to the customer.
	// Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.
	description?: string
	price: number
	/**
	 * Set of key-value pairs that you can attach to an object. This can be useful for storing additional
	 * information about the object in a structured format.
	 * Individual keys can be unset by posting an empty value to them.
	 * All keys can be unset by posting an empty value to metadata.
	 * @type {Record<string, string>}
	 */
	metadata?: Record<string, string>
}