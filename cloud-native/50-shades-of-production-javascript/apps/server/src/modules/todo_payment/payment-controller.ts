import {Controller, Get, Post} from "@nestjs/common"



@Controller('payment')
export class PaymentController {

	@Post(":id/pay")
	/** Pay payment with given payment method */
	public async payPayment() {}


	@Get()
	public async listPayments() {}


	@Get(":id")
	/** Get payment */
	public async getPayment() {}

}