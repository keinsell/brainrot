import {Injectable, Logger} from "@nestjs/common"
import {Account}            from "@prisma/client"
import {Ok, Result}         from "oxide.ts"
import {PrismaService}      from "../../infrastructure/database/prisma/prisma-service.ts"


@Injectable()
export class AccountService {
	private logger: Logger = new Logger(this.constructor.name)

	constructor(
		private readonly prisma: PrismaService,
	) {}

	async register(email: string, password: string): Promise<Result<Account, any>> {
		let account = await this.prisma.account.create({
			data: {
				username: email,
				password,
			},
		})

		this.logger.log(`Account ${account.id} successfully created.`)

		return Ok(account as any)
	}
}