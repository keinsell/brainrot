import {PaymentOrchestrator} from "@boundary/billing/domain/services/payment-orchestrator.js"
import {PaymentController}   from "@boundary/billing/presentation/payment-controller.js"
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