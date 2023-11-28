import {CustomerRepositoryDataSource, CustomerStripeDataDestination, CustomerSynchronization} from "@boundary/identity-and-access/modules/profile/domain/services/customer-data-synchronization.js"
import {ProfileService}                                                                       from "@boundary/identity-and-access/modules/profile/domain/services/profile-service.js"
import {Module}                                                                               from "@nestjs/common"
import {DatabaseModule}                                                                       from "../../../../common/infrastructure/storage/database/database.module.js"



@Module({
	imports:   [DatabaseModule],
	exports:   [ProfileService],
	providers: [
		ProfileService,
		CustomerSynchronization,
		CustomerRepositoryDataSource,
		CustomerStripeDataDestination,
	],
})
export class ProfileModule {}