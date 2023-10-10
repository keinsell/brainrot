import {Injectable, Logger} from "@nestjs/common";
import {Span}               from "nestjs-otel"
import {Err, Ok, Result}    from "oxide.ts";
import {Account}            from "../../infrastructure/database/prisma/prisma-client"
import {PrismaService}      from "../../infrastructure/database/prisma/prisma-service.ts";
import {AccountError}       from "./account-error.ts";

@Injectable()
export class AccountService {
	private logger: Logger = new Logger(this.constructor.name);

	constructor(private readonly prisma: PrismaService) {}

	@Span("create-account")
	async register(
		email: string,
		password: string,
	): Promise<Result<Account, typeof AccountError.CouldNotSaveAccount>> {
		let account: Account;

		try {
			//@ts-ignore
			account = await this.prisma.account.create({
				data: {
					username: email,
					password,
				},
			})

			this.logger.log("Account successfully saved in database.");
		}
		catch (e) {
			this.logger.error(
				`Error while trying to save account in database: ${
					(
						e as unknown as any
					).message
				}`,
			);
			return Err(AccountError.CouldNotSaveAccount);
		}

		return Ok(account);
	}
}
