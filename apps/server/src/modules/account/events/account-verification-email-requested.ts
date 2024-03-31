import { DomainEvent } from '../../../common/lib/domain/domain-event.js'
import { Account }     from '../entities/account.js'



export class AccountVerificationEmailRequested
  extends DomainEvent<Account>
  {
  }