import {Profile} from "@boundary/identity-and-access/modules/profile/domain/entities/profile.js"



export abstract class CustomerDataSynchronization {
	abstract synchronizeCustomerData(profile: Profile): Promise<void>
}