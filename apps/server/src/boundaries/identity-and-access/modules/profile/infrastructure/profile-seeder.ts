import {faker}              from "@faker-js/faker"
import {Injectable, Logger} from "@nestjs/common"
import {PrismaService}      from "../../../../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {SeederV2}           from "../../../../../common/libraries/seeder/seeder-v2.js"
import {Prisma}             from "../../../../../vendor/prisma/index.js"
import UserCreateInput = Prisma.UserCreateInput



@Injectable()
export class ProfileSeeder extends SeederV2<UserCreateInput> {
	private excludedAccountIds = new Array<string>()


	constructor(
		private prismaService: PrismaService,
	) {
		super(
			new Logger("seeder:profile"),
		)
	}


	public async count(): Promise<number> {
		return this.prismaService.user.count()
	}


	public async exists(input: Prisma.UserCreateInput): Promise<boolean> {
		const exists = await this.prismaService.user.findUnique({
			where: {
				accountId: input.Account.connect.id,
			},
		})

		return exists !== null
	}


	public async fabricate(): Promise<Prisma.UserCreateInput> {
		// Find account entity without a profile entity to gain account ID
		const account = await this.prismaService.account.findFirst({
			where: {
				id: {notIn: this.excludedAccountIds},
			},
		})

		if (!account) throw new Error("No account found without a profile entity")

		if (this.excludedAccountIds.includes(account.id)) {
			return this.fabricate()
		}

		this.excludedAccountIds.push(account.id)

		return {
			Account:   {
				connect: {
					id: account.id,
				},
			},
			name:      faker.person.firstName() + " " + faker.person.lastName(),
			createdAt: faker.date.past(),
		}
	}


	public async save(input: Prisma.UserCreateInput): Promise<unknown> {
		return this.prismaService.user.create({
			data: input,
		})
	}
}