import {PaymentController}   from "@boundary/billing/presentation/payment-controller.js"
import {PaymentOrchestrator} from "@boundary/billing/services/payment-orchestrator.js"
import {Module}              from "@nestjs/common"



@Module({
	imports:     [],
	controllers: [PaymentController],
	providers:   [
		PaymentOrchestrator,
	],
})
export class BillingModule {

}