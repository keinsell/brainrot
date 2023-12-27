// Do started checkout should snapshot cart?
import {PaymentMethod} from "../../todo_payment-method/payment-method.js"
import {CheckoutItem}  from "./checkout-item.js"



export interface Checkout {
	id : string
	userId : string
	userEmail? : string
	paymentId : string
	items? : CheckoutItem[]
	availablePaymentMethods? : PaymentMethod[]
	status : "INITIATED" | "COMPLETED" | "AWAITING_PAYMENT" | "PAID" | "CANCELLED"
}