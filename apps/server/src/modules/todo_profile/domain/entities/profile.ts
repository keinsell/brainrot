import {Address}   from "../../../../common/lib/address/address.js"
import {AccountId} from "../../../account/shared-kernel/account-id.js"



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