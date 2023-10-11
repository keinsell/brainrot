import {Injectable, Logger}                  from "@nestjs/common"
import {
	Account,
}                                            from "apollo-server-core/src/plugin/schemaReporting/generated/operations.js"
import {Err, None, Ok, Option, Result, Some} from "oxide.ts"
import {PrismaService}                       from "../../infrastructure/database/prisma/prisma-service.js"
import {AccountError}                        from "./account-error.js"

export abstract class AccountRepository {
	protected logger = new Logger('account:repository')

	abstract findByEmail(email: string): Promise<Result<Option<Account>, typeof AccountError.UnknownDatabaseError>>

	abstract async save(email: string, password: string): Promise<Result<Account, typeof AccountError.UnknownDatabaseError>>
}

@Injectable()
export class PrismaAccountRepository extends AccountRepository {
	constructor(
		private readonly prisma: PrismaService,
	) {super()}

	async findByEmail(email: string): Promise<Result<Option<Account>, typeof AccountError.UnknownDatabaseError>> {
		let account: Account | null = null

		try {
			account = await this.prisma.account.findUnique({
				where: {
					email: email,
				},
			})
		}
		catch (error) {
			this.logger.error(`Error while trying to find account by email: ${email}`, error)
			return Err(AccountError.UnknownDatabaseError)
		}

		return Ok(account ? Some(account) : None)
	}

	async save(email: string, password: string): Promise<Result<Account, typeof AccountError.UnknownDatabaseError>> {
		let account: Account | null = null

		try {
			account = await this.prisma.account.create({
				data: {
					email,
					password,
				},
			})

			this.logger.log("Account successfully saved in database.")
		}
		catch (error) {
			this.logger.error(`Error while trying to save account in database: ${email}`, error)
			return Err(AccountError.UnknownDatabaseError)
		}

		if (!account) {
			return Err(AccountError.UnknownDatabaseError)
		}

		return Ok(account)
	}
}