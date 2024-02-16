import {ApiProperty}       from '@nestjs/swagger'
import {ImmutableClass}    from '../../../kernel/libraries/dst/data-class/data-class.js'
import type {EmailAddress} from '../../../kernel/mailer/value-object/email-address.js'
import {ApiAccountMockup}  from '../../../utils/fixtures/api-account-mockup.js'



export const ApiPropertyAccountEmail = ApiProperty({
	name:        'email',
	description: 'The' + ' account\'s email address',
	example:     ApiAccountMockup.email,
	examples:    ApiAccountMockup._examples.emails,
	type:        String,
})


export class AccountEmail extends ImmutableClass {
	address: EmailAddress
	isVerified: boolean
}
