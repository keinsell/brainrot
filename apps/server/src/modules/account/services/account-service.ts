import {
  Inject,
  Injectable,
  Logger,
}                                 from '@nestjs/common'
import { SpanKind }               from '@opentelemetry/api'
import { setUser }                from '@sentry/node'
import { ServiceAbstract }        from '../../../common/libraries/services/service-abstract.js'
import { PasswordHashing }        from '../../../common/libraries/unihash/index.js'
import { KdfAlgorithm }           from '../../../common/libraries/unihash/key-derivation-functions/key-derivation-function.js'
import { createEmailAddress }     from '../../../common/mailer/value-object/email-address.js'
import { EventBus }               from '../../../common/modules/messaging/event-bus.js'
import { OpentelemetryTracer }    from '../../../common/modules/observability/tracing/opentelemetry/provider/tracer/opentelemetry-tracer.js'
import { RegisterAccountCommand } from '../commands/register-account-command.js'
import { AccountSelfService }     from '../contract/account-self-service.js'
import { Account }                from '../entities/account.js'
import { AccountPolicy }          from '../policies/account-policy.js'
import { AccountRepository }      from '../repositories/account-repository.js'
import { AccountEmail }           from '../value-objects/account-email.js'
import { Password }               from '../value-objects/password.js'
import { createUsername }         from '../value-objects/username.js'



@Injectable()
export class AccountService
  extends ServiceAbstract<Account>
  implements AccountSelfService
  {
	 @Inject( OpentelemetryTracer ) tracer : OpentelemetryTracer
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
		  const span = new OpentelemetryTracer().startSpan( 'com.methylphenidate.account.register', {
			 kind       : SpanKind.INTERNAL,
			 attributes : {
				'op'    : 'function',
				request : JSON.stringify( RegisterAccountCommand ),
			 },
		  } )

		  this.logger.debug( 'Validating inputs...' )
		  const emailResult    = createEmailAddress( registerAccount.email )
		  const usernameResult = createUsername( registerAccount.username )


		  if ( emailResult.isErr() )
			 {
				span.end()
				throw emailResult.error
			 }

		  if ( usernameResult.isErr() )
			 {
				span.end()
				throw usernameResult.error
			 }

		  const username = usernameResult._unsafeUnwrap()
		  const email    = emailResult._unsafeUnwrap()

		  setUser( {
						 email    : email,
						 username : username,
					  } )
		  this.logger.debug( 'Registering account...' )

		  const accountEmail = AccountEmail.create( {
																	 isVerified : false,
																	 address    : email,
																  } )

		  const password = await Password.fromPlain( registerAccount.password, this.hashing.use( KdfAlgorithm.Argon2id ) )

		  span.setAttribute( 'user.password', password.toString() )

		  this.logger.debug( 'Running policy...' )

		  await this.policy.canRegisterAccount( {
																email    : accountEmail.address,
																password : registerAccount.password,
																username : username,
															 } )

		  this.logger.debug( 'Creating aggregate...' )

		  let identity = Account.RegisterAccount( {
																  username : username,
																  email    : accountEmail,
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