import {faker}              from "@faker-js/faker"
import {Injectable, Logger} from "@nestjs/common"
import {PrismaService}      from "../../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {SeederBase}         from "../../../common/libraries/seeder/seeder-base.js"
import {AccountFixture}     from "../../../utilities/fixtures/account-fixture.js"
import {$Enums}             from "../../../vendor/prisma/index.js"
import {AccountService}     from "../services/account-service.js"
import {RegisterAccountDto} from "../dtos/register-account-dto.js"
import EmailVerificationStatus = $Enums.EmailVerificationStatus



@Injectable()
export class AccountSeeder extends SeederBase<RegisterAccountDto> {

	constructor(private prismaService: PrismaService, private accountService: AccountService) {
		super(new Logger("seeder:domain"))
	}


	public async count(): Promise<number> {
		return this.prismaService.account.count()
	}


	public async exists(input: RegisterAccountDto): Promise<boolean> {
		const exists = await this.prismaService.account.findUnique({
			where: {
				email: input.email,
			},
		})

		return exists !== null
	}


	public async fabricate(): Promise<RegisterAccountDto> {
		return {
			email:    faker.internet.email(),
			password: AccountFixture.password,
			username: faker.internet.userName(),
		}
	}


	public async save(input: RegisterAccountDto): Promise<unknown> {
		const account = await this.accountService.register(input)

		// Verify domain

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