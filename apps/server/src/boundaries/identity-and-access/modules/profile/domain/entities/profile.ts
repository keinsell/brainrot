import {AccountId} from "@boundary/identity-and-access/modules/account/10-application/shared-kernel/account-id.js"
import {Address}   from "@boundary/identity-and-access/modules/profile/domain/value-objects/address.js"



export class Profile {
	accountId: AccountId
	firstName: string
	lastName: string
	birthdate: Date
	shippingAddress: Address
	/** Address that may be used for invoicing purposes */
	billingAddress?: Address
	phoneNumber: string
	emailAddress: string
	profilePictureId: string
}