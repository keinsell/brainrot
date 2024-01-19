import {
  Inject,
  Injectable,
  Logger,
}                                 from '@nestjs/common'
import {
  getCurrentScope,
  setUser,
}                                 from '@sentry/node'
import { ServiceAbstract }        from '../../../common/libraries/services/service-abstract.js'
import { PasswordHashing }        from '../../../common/libraries/unihash/index.js'
import { KdfAlgorithm }           from '../../../common/libraries/unihash/key-derivation-functions/key-derivation-function.js'
import type { EmailAddress }      from '../../../common/mailer/value-object/email-address.js'
import { EventBus }               from '../../../common/modules/messaging/event-bus.js'
import { _startInactiveSpan }     from '../../../common/modules/observability/tracing/contract/globs.js'
import { TraceService }           from '../../../common/modules/observability/tracing/opentelemetry/service/trace-service.js'
import { RegisterAccountCommand } from '../commands/register-account-command.js'
import { AccountSelfService }     from '../contract/account-self-service.js'
import { Account }                from '../entities/account.js'
import { AccountPolicy }          from '../policies/account-policy.js'
import { AccountRepository }      from '../repositories/account-repository.js'
import { AccountEmail }           from '../value-objects/account-email.js'
import { Password }               from '../value-objects/password.js'



@Injectable()
export class AccountService
  extends ServiceAbstract<Account>
  implements AccountSelfService
  {
	 @Inject( TraceService ) tracer : TraceService
	 private logger : Logger = new Logger( 'account::service' )

	 constructor(
		private policy : AccountPolicy,
		private repository : AccountRepository,
		private hashing : PasswordHashing,
		private eventbus : EventBus,
	 )
		{
		  super( repository )
		}

	 public closeAccount(accountId : string) : Promise<void>
		{
		  throw new Error( 'Method not implemented.' )
		}

	 /**
	  * # `register-account`
	  *
	  * Register account is an operation dedicated to creating new accounts in codebase.
	  *
	  * @param {RegisterAccountCommand} registerAccount
	  * @returns {Promise<Account>}
	  */
	 async register(registerAccount : RegisterAccountCommand) : Promise<Account>
		{
		  const span = _startInactiveSpan( {
														 name       : 'register-account',
														 source     : 'task',
														 scope      : getCurrentScope(),
														 attributes : {},
													  } )



		  this.logger.debug( 'Registering account...' )

		  const email = AccountEmail.create( {
															isVerified : false,
															address    : registerAccount.email.toLowerCase() as EmailAddress,
														 } )

		  const password = await Password.fromPlain( registerAccount.password, this.hashing.use( KdfAlgorithm.Argon2id ) )

		  setUser( {
						 email    : registerAccount.email.toLowerCase(),
						 username : registerAccount.username.toLowerCase(),
					  } )

		  this.logger.debug( 'Running policy...' )

		  await this.policy.canRegisterAccount( {
																email    : email.address,
																password : registerAccount.password,
																username : registerAccount.username.toLowerCase(),
															 } )

		  this.logger.debug( 'Creating aggregate...' )

		  let identity = Account.RegisterAccount( {
																  username : registerAccount.username.toLowerCase(),
																  email    : email,
																  password : password,
																  groups   : [],
																} )

		  const events = identity.getUncommittedEvents()

		  this.logger.debug( 'Saving aggregate...' )

		  identity = await this.repository.save( identity )

		  this.logger.debug( 'Publishing events...' )

		  await this.eventbus.publishAll( events )

		  this.logger.log( `Account ${identity.id} was successfully registered.` )

		  setUser( {
						 email    : identity.email.address,
						 username : identity.username,
						 id       : identity.id,
					  } )

		  span.end()

		  return identity
		}

	 public updateAccount(
		accountId : string,
		updateAccount : RegisterAccountCommand,
	 ) : Promise<Account>
		{
		  throw new Error( 'Method not implemented.' )
		}
  }