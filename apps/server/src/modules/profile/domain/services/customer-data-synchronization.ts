import {Injectable}                 from "@nestjs/common"
import {DataDestination}            from "../../../../common/_unknown_lib/data-synchronization/data-destination.js"
import {DataSource}                 from "../../../../common/_unknown_lib/data-synchronization/data-source.js"
import {DataSynchronizationManager} from "../../../../common/_unknown_lib/data-synchronization/data-synchronization-manager.js"
import {PrismaService}              from "../../../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {User}                       from "../../../../vendor/prisma/index.js"



@Injectable()
export class CustomerSynchronization
	extends DataSynchronizationManager<User> {
	constructor(
		private readonly dataSource: CustomerRepositoryDataSource,
		private readonly dataDestination: CustomerStripeDataDestination,
	) {
		super()
		this.registerDataDestination(dataDestination)
		this.registerDataSource(dataSource)
	}
}


@Injectable()
export class CustomerRepositoryDataSource extends DataSource<User> {
	constructor(
		private prismaService: PrismaService,
	) {super()}


	public async fetch(identifier: string): Promise<User> {
		const user = this.prismaService.user.findUnique({
			where: {id: identifier},
		})
		if (user) {
			return user
		}
		else {
			throw new Error(`Could not find user with id ${identifier}`)
		}
	}
}


@Injectable()
export class CustomerStripeDataDestination extends DataDestination<User> {
	public async push(payload: User): Promise<void> {
		// Get stripe customer by metadata
		// If exist update information
		// If not exist create customer

		return Promise.resolve(undefined)
	}
}