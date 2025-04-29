/**
 * @see [Stripe](https://stripe.com/docs/invoicing/overview#invoice-statuses)
 */
export enum InvoiceStatus
  {
	 /**
	  * The invoice isn’t ready to use. All invoices start in `draft` status.
	  * @type {InvoiceStatus.DRAFT}
	  */
	 DRAFT        = 'draft',
	 /**
	  * 	The invoice is finalized and awaiting payment.
	  * @type {InvoiceStatus.OPEN}
	  */
	 OPEN         = 'open',
	 /**
	  * This invoice is paid.
	  * @type {InvoiceStatus.PAID}
	  */
	 PAID         = 'paid',
	 /**
	  * The customer is unlikely to pay the invoice. Normally, you treat it as bad debt in your accounting process.
	  * @type {InvoiceStatus.UNCOLLECTIVE}
	  */
	 UNCOLLECTIVE = 'uncollectible',
	 /**
	  * This invoice is canceled.
	  * @type {InvoiceStatus.VOID}
	  */
	 VOID         = 'void',
  }


export interface Invoice
  {
	 id : string;
	 /**
	  * An arbitrary string attached to the object. Often useful for displaying to users.
	  * @see [Stripe](https://stripe.com/docs/api/invoices/object#invoice_object-description)
	  */
	 memo : string
	 /** Final amount due at this time for this invoice. If the invoice’s
	  * total is smaller than the minimum charge amount, for example, or if
	  * there is account credit that can be applied to the invoice, the
	  * [`amount_due`]{@link Invoice.amount_due} may be 0. If there is a positive starting_balance for the
	  * invoice (the customer owes money), the [`amount_due`]{@link Invoice.amount_due} will also take that
	  * into account. The charge that gets generated for the invoice will be
	  * for the amount specified in [`amount_due`]{@link Invoice.amount_due}. */
	 amount_due : number
	 /** The amount, in cents, that was paid. */
	 amount_paid : number
	 /** The difference between [`amount_due`]{@link Invoice.amount_due} and
	  *  [`amount_paid`]{@link
	  *  Invoice.amount_paid}, in
	  *  cents. */
	 amount_remaining : number
	 amount_shipping : number
	 /** Total after discounts and taxes. */
	 total : number
	 /** The date on which payment for this invoice is due. */
	 due_date : Date
	 /** End of the usage period during which invoice items were added to
	  * this invoice.
	  * @see [Stripe Documentation](https://stripe.com/docs/api/invoices/object#invoice_object-period_end)
	  */
	 period_end : Date
	 /** Start of the usage period during which invoice items were added to
	  *  this invoice.
	  *  @see [Stripe Documentation](https://stripe.com/docs/api/invoices/object#invoice_object-period_start)
	  *  */
	 period_start : Date
	 createdAt : Date
	 updatedAt : Date
	 status : InvoiceStatus
	 metadata : any
  }
