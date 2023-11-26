import {faker}              from "@faker-js/faker"
import {Injectable, Logger} from "@nestjs/common"
import {PrismaService}      from "../../../../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {SeederV2}           from "../../../../../common/libraries/seeder/seeder-v2.js"
import {Prisma}             from "../../../../../vendor/prisma/index.js"
import AccountCreateInput = Prisma.AccountCreateInput



@Injectable()
export class AccountSeeder extends SeederV2<AccountCreateInput> {

	constructor(
		private prismaService: PrismaService,
	) {
		super(new Logger("seeder:account"))
	}


	public async count(): Promise<number> {
		return this.prismaService.account.count()
	}


	public async exists(input: Prisma.AccountCreateInput): Promise<boolean> {
		const exists = await this.prismaService.account.findUnique({
			where: {
				email: input.email,
			},
		})

		return exists !== null
	}


	public async fabricate(): Promise<Prisma.AccountCreateInput> {
		return {
			email:    faker.internet.email(),
			password: faker.internet.password(),
			username: faker.internet.userName(),
		}
	}


	public async save(input: Prisma.AccountCreateInput): Promise<unknown> {
		return this.prismaService.account.create({
			data: input,
		})
	}
}