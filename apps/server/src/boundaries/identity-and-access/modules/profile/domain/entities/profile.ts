import {AccountId} from "@boundary/identity-and-access/modules/account/10-application/shared-kernel/account-id.js"
import {Address}   from "@boundary/identity-and-access/modules/profile/value-objects/address.js"



export class Profile {
	accountId: AccountId
	firstName: string
	lastName: string
	birthdate: Date
	shippingAddress: Address
	billingAddress: Address
	phoneNumber: string
	emailAddress: string
	profilePictureId: string
}