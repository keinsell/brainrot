import {Injectable}              from "@nestjs/common"
import {PrismaService}           from "../../../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {Prisma, User}            from "../../../../vendor/prisma/index.js"
import {CustomerSynchronization} from "./customer-data-synchronization.js"
import UserCreateInput = Prisma.UserCreateInput



@Injectable()
export class ProfileService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly customerSynchronization: CustomerSynchronization,
	) {}


	public async createProfile(profile: UserCreateInput): Promise<User> {
		const createdProfile = this.prismaService.user.create({data: profile})

		// Push a newly created profile to external providers like Stripe
		await this.customerSynchronization.provide(createdProfile as any).push()

		return createdProfile
	}
}