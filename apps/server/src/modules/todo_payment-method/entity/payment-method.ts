/*
 * MIT License
 *
 * Copyright (c) 2024 Jakub Olan <keinsell@protonmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import {AccountId}                  from "../../account/shared-kernel/account-id.js";
import {PaymentProcessorIdentifier} from "../../todo_payment/value-objects/payment-processor-identifier.js";
import {PaymentMethodId}            from "../value/payment-method-id.js";
import {StripeCustomerId}           from "../value/stripe-customer-id.js";



export interface PaymentMethod {
	id : PaymentMethodId
	customerId : AccountId
	processor : PaymentProcessorIdentifier
	paymentDetails : PaymentDetails
	billingAddress : any
	isDefault : boolean
	status : "ACTIVE" | "INACTIVE" | "DELETED"
	metadata : any
}


export interface StripePaymentMethod
	extends PaymentMethod {
	stripeCustomerId : StripeCustomerId;
	stripeCardId : string;
}


export interface PaymentDetails {
	id : string
	paymentMethodId : PaymentMethodId
	type : "CREDIT_CARD" | "BANK_ACCOUNT"
}


export interface CreditCardPaymentDetails
	extends PaymentDetails {
	cardNumber : string
	cardHolderName : string
	cardExpiryMonth : string
	cardExpiryYear : string
	cardCVC : string
}


export interface BankAccountPaymentDetails
	extends PaymentDetails {
	bankAccountNumber : string
	bankAccountHolderName : string
	bankAccountType : "CHECKING" | "SAVINGS" | "OTHER"
	bankAccountRoutingNumber : string
	bankAccountIban : string
	bankAccountBic : string
	bankAccountCountry : string
	bankAccountCurrency : string
	bankAccountStatus : "NEW" | "VERIFIED" | "VERIFICATION_FAILED"
}