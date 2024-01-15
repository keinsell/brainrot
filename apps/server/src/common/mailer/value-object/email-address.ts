import typia, {
  createAssert,
  createIs,
} from 'typia'
import type {
  Opaque,
  UnwrapOpaque,
} from '../../libraries/opaque.js'



export type EmailAddress =
  Opaque<string
			& typia.tags.Format<'email'>, 'email'>


const assertEmailAddress      = createAssert<UnwrapOpaque<EmailAddress>>()
const isEmailAddressValidator = createIs<UnwrapOpaque<EmailAddress>>()

export function isEmailAddress(value : unknown) : value is EmailAddress
  {
	 return isEmailAddressValidator( value )
  }