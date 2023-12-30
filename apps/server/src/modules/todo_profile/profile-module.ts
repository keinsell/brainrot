import {Module} from "@nestjs/common"
import {
	DatabaseModule,
}               from "../../common/modules/database/database.module.js"
import {
	CustomerRepositoryDataSource,
	CustomerStripeDataDestination,
	CustomerSynchronization,
}               from "./domain/services/customer-data-synchronization.js"
import {
	ProfileService,
}               from "./domain/services/profile-service.js"



@Module({
	imports  : [DatabaseModule],
	exports  : [ProfileService],
	providers: [
		ProfileService,
		CustomerSynchronization,
		CustomerRepositoryDataSource,
		CustomerStripeDataDestination,
	],
})
export class ProfileModule {}