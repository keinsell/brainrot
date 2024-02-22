import {
	Controller,
	Delete,
	Get,
	Post,
} from '@nestjs/common'



@Controller('checkout')
export class CheckoutController
{
	// Before a user can make a checkout, they need to have knowledge about existing methods of payment.
	// This method should return a list of available payment methods, which user can choose from.
	// This method should be called before the checkout process is initialized.

	@Get('payment-methods')
	async getPaymentMethods()
	{
		return 'getPaymentMethods'
	}

	// Some orders that aren't physical goods may need to define shipment method,
	// there is lots of them and in fact we're billing customer for option he will choose,
	// in order - we must add endpoint to expose available shipment methods.

	@Get('shipment-methods')
	async getShipmentMethods()
	{
		return 'getPaymentMethods'
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
	async initialize()
	{
		return 'initalize'
	}

	@Post('cart/:cardId')
	async initializeWithCart()
	{
		return 'initalizeWithCart'
	}

	// Initialization of checkout is done,
	// this produced a soft-lock on the items we had in the cart - which means nobody can take products we wanted to
	// buy. User should be now able to get a summary of checkout to check price, discounts and overall whole billing
	// process.
	// Similar to carts, a user can have only one checkout at a time, which they can void at any time, until they pay
	// for it.
	// The calulation of the price should presnt immutable price which user will pay now or later.

	@Get()
	async summary()
	{
		return 'summary'
	}

	// If a customer fucked something up, he can void the checkout without taking any responsibility.

	@Delete()
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
