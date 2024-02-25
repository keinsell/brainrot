import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
} from '@nestjs/common';
import {
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiProperty,
} from '@nestjs/swagger';
import { PrismaService } from '../../common/modules/resources/prisma/services/prisma-service.js';
import { Account } from '../../modules/account/entities/account.js';
import { RequestIdentity } from '../../modules/authentication/request-identity.js';
import type {Prisma, Product} from 'db'
import { ApiPropertyProductId } from './product-controller.js';

export class AddCheckoutItem {
	@ApiPropertyProductId
	productId: string
	@ApiProperty({type: 'number', example: 1})
	quantity: number
}

export class CheckoutItem {
	productId: string
	quantity: number
	subtotal: number
	discount: number
	tax: number
	total: number
}

export class CheckoutPaymentMethods {
	@ApiProperty({type: 'array', items: {type: 'string'}, example: ['stripe']})
	paymentMethods: string[]
}

export class CheckoutStripePaymentMethod {
	@ApiProperty({type: 'string', example: 'cus_J3z3v2eZvKYlo2C5z3v2eZvKYlo', required: false})
	customerId?: string
	@ApiProperty({type: 'string', example: 'pm_1J3z3v2eZvKYlo2C5z3v2eZvKYlo', required: false})
	paymentMethodId: string
}


export class CheckoutPaymentMethod {
	@ApiProperty({type: CheckoutStripePaymentMethod, required: false})
	stripe?: CheckoutStripePaymentMethod
	paypal?: {
		accountId: string
	}
}

export class InitializeCheckout
{
	@ApiProperty({type: CheckoutPaymentMethod})
	paymentMethod?: CheckoutPaymentMethod
	shipmentMethod?: {
		provider: string
		service: string
	}
	@ApiProperty({type: [AddCheckoutItem]})
	items: AddCheckoutItem[]
}

export class CheckoutSummary {
	items: AddCheckoutItem[]
	@ApiProperty({type: 'string', example: 'PLN'})
	currency: string
	@ApiProperty({type: 'number', example: 1000})
	total: number
}

@Controller('checkout')
export class CheckoutController
{
	/** List with services available in backend for processing payments */
	private PAYMENT_METHOD_SERVICES: {paymentMethodIdentifier: string}[] = [
		{paymentMethodIdentifier: "stripe"}
]

	/** List of avaliable shipment providers */
	private SHIPMENT_METHOD_SERVICES: {shipmentMethodIdentifier: string}[] = [
		{shipmentMethodIdentifier: "dhl"}
	]

	private readonly productRepository: Prisma.ProductDelegate

	constructor(prisma: PrismaService)
	{
		this.productRepository = prisma.product
	}

	// Before a user can make a checkout, they need to have knowledge about existing methods of payment.
	// This method should return a list of available payment methods, which user can choose from.
	// This method should be called before the checkout process is initialized.

	@ApiOperation({summary: "Available PaymentMethods for Checkout", operationId: 'get-checkout-payment-methods',})
	@ApiOkResponse({type: CheckoutPaymentMethods})
	@Get('payment-methods')
	async getPaymentMethods()
	{
		return this.PAYMENT_METHOD_SERVICES.map((service) => service.paymentMethodIdentifier)
	}

	// Some orders that aren't physical goods may need to define shipment method,
	// there are lots of them and in fact we're billing customer for option he will choose,
	// in order - we must add endpoint to expose available shipment methods.

	@Get('shipment-methods')
	async getShipmentMethods()
	{
		return this.SHIPMENT_METHOD_SERVICES.map((service) => service.shipmentMethodIdentifier)
	}

	// There are two methods of initializing the checkout process,
	// the First one is to provide all the items we're willing to purchase manually
	// Second one is to provide a cart id and let the server fetch the items from the cart.
	//
	// Comparing to carts, the checkout process is immutable, once it's made it cannot be really changed, only voided.
	// Checkouts need a confirmation of user to be paid for, so the account is required to be logged in to make a
	// checkout.
	// In the future, we might want to add a feature to make a checkout without an account, but for now it's too
	// complicated.


	@Post()
	@ApiOperation({summary: "Initialize Checkout", operationId: 'initialize-checkout', description: "Initialization of the checkout is pre-final process of placing order in our system, the Customer is able to declare real intention to buy and we calculate the stuff for him, at the end he gets a CheckoutSummary which describes things he's going to buy and the price he's going to pay. Checkout is immutable once it's made, the only thing Customer can do when his order is not correct is cancellation of Checkout. Process itself will result in Checkout with list of CheckoutItem, draft of an Invoice and Discount."})
	@ApiBody({type: InitializeCheckout})
	@ApiOkResponse({type: CheckoutSummary})
	async initialize(
		@Body() initializeCheckout: InitializeCheckout,
		@RequestIdentity() identity: Account,
	)
	{
		let checkoutItems: CheckoutItem[] = []
		let products: Product[] = []

		// We need to check if the user is logged in
		products = await this.productRepository.findMany({
			where: {
				id: {
					in: initializeCheckout.items.map((item) => item.productId)
				}
			}
		})

		// We need to calculate the summary of the checkout, so we need to fetch the items and calculate the price.
		for (const checkoutItemPayload of initializeCheckout.items) {
			// Fetch the product from the database
			const checkoutItemProduct = products.find((product) => product.id === checkoutItemPayload.productId)

			if (!checkoutItemProduct) {
				// Throw an error that the product is not found
				throw new Error(`Product with id ${checkoutItemPayload.productId} not found`)
			}

			// The checks that must be made:
			// - Product availability
			// - Product quantity
			// - Product price
			// - Product discount

			// The futher steps:
			// - Calculation of the price
			// - Calculation of the tax
			// - Calculation of the discount
			// - Calculation of the subtotal
			// - Calculation of the total
		}

		// After products are fine and overall content of the checkout itself is fine, we consider it that cart was okay
		// We can proceed with checks for payment methods and shipment methods
		// We need to check if payment method is available and can be used by given customer
		// We need to check if shipment method is available and can be used by given customer

		// If everything is fine, we need to create a "Discount" and "Invoice" objects for checkout,
		// based on previously calculated values.

		// Invoice can happen in the future based on event - the invoice object here really depends on payment method used.

		return 'initalize'
	}

	@Post('cart/:cardId')
	async initializeWithCart()
	{
		return 'initializeWithCart'
	}

	// Initialization of checkout is done,
	// this produced a soft-lock on the items we had in the cart - which means nobody can take products we wanted to
	// buy. User should be now able to get a summary of checkout to check price, discounts and overall whole billing
	// process.
	// Similar to carts, a user can have only one checkout at a time, which they can void at any time, until they pay
	// for it.
	// The calculation of the price should present an immutable price which user will pay now or later.

	@Get()
	async summary()
	{
		return 'summary'
	}

	// If a customer fucked something up, he can void the checkout without taking any responsibility.

	@Delete()
	@ApiOperation({summary: "Cancel Checkout", operationId: "cancel-checkout", description: "Operation will cancel the current checkout process started by user, as process is immutable once it's made - the only thing Customer can do when his order is not correct is cancellation of Checkout."})
	async void()
	{
		return 'void'
	}

	// After the user is happy with the summary, they can proceed with finalization of the checkout.

	@Post('finalize')
	async finalize()
	{
		return 'finalize'
	}

	// Finalization should always end up in Order or Subscription depending on the user's checkout.

	// Depending on the internal configuration,
	// chosen payment methods and a few other factors which are not known yet -
	// payment may happy just at this moment or in a future time (we save payment method to use it later).
	//
	// I think checkout in some cases may result in 3DS failure...
}
