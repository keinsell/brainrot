import { ImmutableClass }    from '../../../common/libraries/dst/data-class/data-class.js'
import type { EmailAddress } from '../../../common/mailer/value-object/email-address.js'



export class AccountEmail
  extends ImmutableClass
  {
	 address : EmailAddress
	 isVerified : boolean
  }