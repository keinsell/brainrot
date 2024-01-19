import { BadRequestException } from '@nestjs/common'
import { startInactiveSpan }   from '@sentry/opentelemetry'
import {
  err,
  ok,
  Result,
}                              from 'neverthrow'
import typia, {
  createAssert,
  createIs,
}                              from 'typia'
import type {
  Opaque,
  UnwrapOpaque,
}                              from '../../libraries/opaque.js'



export type EmailAddress = Opaque<string & typia.tags.Format<'email'>, 'email'>


const assertEmailAddress      = createAssert<UnwrapOpaque<EmailAddress>>()
const isEmailAddressValidator = createIs<UnwrapOpaque<EmailAddress>>()


export class InvalidEmailAddressError
  extends BadRequestException
  {
	 constructor()
		{
		  super( 'Invalid email address' )
		}
  }


export function isEmailAddress(value : unknown) : value is EmailAddress
  {
	 return isEmailAddressValidator( value )
  }

export function createEmailAddress(value : string) : Result<EmailAddress, Error>
  {
	 const span = startInactiveSpan( {
												  name : 'email.address.createEmailAddress',
												  op   : 'function',
												} )

	 try
		{
		  const emailAddress = assertEmailAddress( value ) as EmailAddress
		  span.end()
		  return ok( emailAddress )
		}
	 catch ( e )
		{
		  span.end()
		  return err( new InvalidEmailAddressError() )
		}

  }