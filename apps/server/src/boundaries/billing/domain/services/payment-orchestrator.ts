import {PaymentProcessor}           from "@boundary/billing/domain/services/payment-processor.js"
import {PaymentProcessorIdentifier} from "@boundary/billing/domain/value-objects/payment-processor-identifier.js"
import {Injectable}                 from "@nestjs/common"



@Injectable()
export class PaymentOrchestrator {
	private _processorRegistry: Map<PaymentProcessorIdentifier, PaymentProcessor> = new Map()


	registerProcessor(processor: PaymentProcessor) {
		this._processorRegistry.set(processor.PAYMENT_PROCESSOR_ID, processor)
	}


	getProcessor(paymentProcessorId: PaymentProcessorIdentifier): PaymentProcessor {
		const processor = this._processorRegistry.get(paymentProcessorId)
		if (!processor) throw new Error(`No processor registered for payment method ID "${paymentProcessorId}"`)
		return processor
	}


	unregisterProcessor(paymentProcessorId: PaymentProcessorIdentifier) {
		this._processorRegistry.delete(paymentProcessorId)
	}


	isAvailable(paymentProcessorId: PaymentProcessorIdentifier): boolean {
		return this._processorRegistry.has(paymentProcessorId)
	}
}