import { DomainEvent }         from '../../../common/libraries/domain/domain-event.js'
import { AuthenticationToken } from '../entity/authentication-token.js'



export class AuthenticationTokenIssued
  extends DomainEvent<AuthenticationToken>
  {
  }