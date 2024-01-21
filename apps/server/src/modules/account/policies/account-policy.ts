import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
}                                from '@nestjs/common'
import { SpanStatusCode }        from '@opentelemetry/api'
import {
  err,
  ok,
}                                from 'neverthrow'
import { BasePolicy }            from '../../../common/libraries/domain/policy/base-policy.js'
import { Pwnproc }               from '../../../common/libraries/pwnproc/pwnproc.js'
import { PasswordSecurityLevel } from '../../../common/libraries/pwnproc/report/password-security-level.js'
import { OpentelemetryTracer }   from '../../../common/modules/observability/tracing/opentelemetry/provider/tracer/opentelemetry-tracer.js'
import { AccountRepository }     from '../repositories/account-repository.js'



@Injectable()
export class AccountPolicy
  extends BasePolicy
  {
	 @Inject( OpentelemetryTracer ) tracer : OpentelemetryTracer
	 private logger : Logger = new Logger( 'account::policy' )

	 constructor(
		private readonly accountRepository : AccountRepository,
		private readonly passwordSecurity : Pwnproc,
	 )
		{
		  super()
		}


	 public async canRegisterAccount(registerAccount : {
		email : string, username : string, password : string,
	 })
		{
		  const span = this.tracer.startSpan( 'account::policy::canRegisterAccount' )


		  this.logger.debug( `Validating 'canRegisterAccount' policy for: ${JSON.stringify( registerAccount )}` )

		  const isUniqueUsername = await this.isUniqueUsername( registerAccount.username )
		  const isUniqueEmail    = await this.isUniqueEmail( registerAccount.email )
		  const isSecurePassword = await this.isSecurePassword( registerAccount.password )

		  const maybePolicy = this.merge( isUniqueUsername, isUniqueEmail, isSecurePassword )

		  this.logger.verbose( `Validated 'canRegisterAccount' policy => ${JSON.stringify( maybePolicy )}` )

		  if ( maybePolicy.isErr() )
			 {
				span.setStatus( {code : SpanStatusCode.ERROR} )
				span.recordException( maybePolicy.error )
				span.end()
				throw maybePolicy.error
			 }
		  else
			 {
				span.setStatus( {code : SpanStatusCode.OK} )
				span.end()
				return maybePolicy.value
			 }
		}


	 private async isUniqueUsername(username : string)
		{
		  this.logger.debug( `Validating username uniqueness for: ${username}` )
		  const identity = await this.accountRepository.findByUsername( username )

		  if ( identity )
			 {
				this.logger.verbose( `Username ${username} is already in use in system, try logging in instead.` )
				return err( new ConflictException( 'Username is already in use in system, try logging in instead.' ) )
			 }

		  this.logger.verbose( `Username ${username} is unique.` )
		  return ok( true )
		}


	 private async isUniqueEmail(email : string)
		{
		  this.logger.debug( `Validating email uniqueness for: ${email}` )
		  const identity = await this.accountRepository.findByEmail( email )

		  if ( identity )
			 {
				this.logger.verbose( `Email ${email} is already in use in system, try logging in instead.` )
				const error = new ConflictException( 'Email is already in use in system, try logging in instead.' )
				return err( error )
			 }

		  this.logger.verbose( `Email ${email} is unique.` )
		  return ok( true )
		}


	 private async isSecurePassword(password : string)
		{
		  this.logger.debug( `Validating password security for: ${password}` )

		  const report = await this.passwordSecurity.generateReport( password )

		  if ( report.isScoreHigherThan( PasswordSecurityLevel.WEAK ) )
			 {
				this.logger.verbose( `Password is insecure enough.` )
				return ok( true )
			 }
		  else
			 {
				this.logger.verbose( `Password is insecure.` )
				const error = new BadRequestException( 'Password is insecure enough.' )
				return err( error )
			 }
		}
  }