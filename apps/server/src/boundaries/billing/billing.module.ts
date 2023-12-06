import {Module}              from "@nestjs/common"
import {PaymentOrchestrator} from "../../domain/payment/services/payment-orchestrator.js"
import {PaymentController}   from "../../modules/payment/payment-controller.js"



@Module({
	imports:     [],
	controllers: [PaymentController],
	providers:   [
		PaymentOrchestrator,
	],
})
export class BillingModule {

}