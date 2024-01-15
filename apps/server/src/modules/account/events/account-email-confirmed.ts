import { Event }             from '../../../common/libraries/message/event.js'
import type { AccountEmail } from '../value-objects/account-email.js'



export interface AccountEmailConfirmedPayload
  {
	 accountId : string
	 email : AccountEmail
  }


export class AccountEmailConfirmed
  extends Event<AccountEmailConfirmedPayload>
  {
	 constructor(account : AccountEmailConfirmedPayload)
		{
		  super( {
					  namespace : 'account.verification.completed',
					  body      : account,
					} )
		}
  }