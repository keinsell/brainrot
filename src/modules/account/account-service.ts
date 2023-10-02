import {Injectable}    from "@nestjs/common"
import {Account}       from "@prisma/client"
import {Ok, Result}    from "oxide.ts"
import {PrismaService} from "../../infrastructure/database/prisma/prisma-service.ts"


@Injectable()
export class AccountService {
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

		return Ok(account as any)
	}
}