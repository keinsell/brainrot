import {RegisterAccount}    from "@boundary/identity-and-access/modules/account/10-application/commands/register-account.js"
import {AccountService}     from "@boundary/identity-and-access/modules/account/20-service/account.service.js"
import {faker}              from "@faker-js/faker"
import {Injectable, Logger} from "@nestjs/common"
import {PrismaService}      from "../../../../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {SeederBase}         from "../../../../../common/libraries/seeder/seeder-base.js"
import {AccountFixture}     from "../../../../../utilities/fixtures/account-fixture.js"
import {$Enums}             from "../../../../../vendor/prisma/index.js"
import EmailVerificationStatus = $Enums.EmailVerificationStatus



@Injectable()
export class AccountSeeder extends SeederBase<RegisterAccount> {

	constructor(
		private prismaService: PrismaService,
		private accountService: AccountService,
	) {
		super(new Logger("seeder:account"))
	}


	public async count(): Promise<number> {
		return this.prismaService.account.count()
	}


	public async exists(input: RegisterAccount): Promise<boolean> {
		const exists = await this.prismaService.account.findUnique({
			where: {
				email: input.email,
			},
		})

		return exists !== null
	}


	public async fabricate(): Promise<RegisterAccount> {
		return {
			email:    faker.internet.email(),
			password: AccountFixture.password,
			username: faker.internet.userName(),
		}
	}


	public async save(input: RegisterAccount): Promise<unknown> {
		const account = await this.accountService.register(input)

		// Verify account

		await this.prismaService.account.update({
			where: {
				id: account.id,
			},
			data:  {
				emailVerificationStatus: EmailVerificationStatus.VERIFIED,
			},
		})

		return account
	}
}