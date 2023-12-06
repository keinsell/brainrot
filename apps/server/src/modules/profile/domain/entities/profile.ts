import {Address}   from "../../../../common/libraries/address/address.js"
import {AccountId} from "../../../account/10-application/shared-kernel/account-id.js"



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