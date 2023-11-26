import {PaymentProcessor} from "@boundary/billing/services/payment-processor.js"
import {Injectable}       from "@nestjs/common"



@Injectable()
export class PaymentOrchestrator {
	private _processorRegistry: Map<string, PaymentProcessor> = new Map()


	registerProcessor(processor: PaymentProcessor) {
		this._processorRegistry.set(processor.PAYMENT_PROCESSOR_ID, processor)
	}


	getProcessor(paymentProcessorId: string): PaymentProcessor {
		const processor = this._processorRegistry.get(paymentProcessorId)
		if (!processor) throw new Error(`No processor registered for payment method ID "${paymentProcessorId}"`)
		return processor
	}


	unregisterProcessor(paymentProcessorId: string) {
		this._processorRegistry.delete(paymentProcessorId)
	}
}