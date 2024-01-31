import {ApiProperty}       from '@nestjs/swagger'
import {ImmutableClass}    from '../../../common/libraries/dst/data-class/data-class.js'
import type {EmailAddress} from '../../../common/mailer/value-object/email-address.js'
import {AccountFixture}    from '../../../utilities/fixtures/account-fixture.js'



export const ApiPropertyAccountEmail = ApiProperty({
	                                                   name       : 'email',
	                                                   description: 'The'
	                                                                + ' account\'s email address',
	                                                   example    : AccountFixture.email,
	                                                   examples   : AccountFixture._examples.emails,
	                                                   type       : String,
                                                   })


export class AccountEmail
	extends ImmutableClass
	{
		address: EmailAddress
		isVerified: boolean
	}