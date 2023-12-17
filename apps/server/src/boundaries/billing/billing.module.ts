import {Module}              from "@nestjs/common"
import {PaymentController}   from "../../modules/payment/payment-controller.js"
import {PaymentOrchestrator} from "../../modules/payment/services/payment-orchestrator.js"



@Module({
	imports:     [],
	controllers: [PaymentController],
	providers:   [
		PaymentOrchestrator,
	],
})
export class BillingModule {

}