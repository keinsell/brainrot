import {Controller, Delete, Get} from "@nestjs/common"



@Controller("payment-method")
export class PaymentMethodController {
	@Get()
	public async listPaymentMethods() {}


	@Get(":id")
	public async getPaymentMethod() {}


	@Delete(":id")
	public async removePaymentMethod() {}
}