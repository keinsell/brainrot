import {Injectable, Logger} from "@nestjs/common";
import {Span}               from "nestjs-otel"
import {Err, Ok, Result}    from "oxide.ts";
import {Account}            from "prisma-client"
import {AccountError}       from "./account-error.ts";
import {AccountPolicy}      from "./account-policy.js"
import {AccountRepository}  from "./account-repository.js"

@Injectable()
export class AccountService {
	protected logger = new Logger('account:service')

	constructor(private readonly repository: AccountRepository, private accountPolicy: AccountPolicy) {}

	@Span("create-account")
	async register(
		email: string,
		password: string,
	): Promise<Result<Account, typeof AccountError.AccountAlreadyExists | typeof AccountError.UnknownDatabaseError>> {
		this.logger.log(this.repository)
		this.logger.log(this.accountPolicy)


		let account: Account;

		// Validate if email is unique

		const maybeIsEmailUniqueOrError = await this.accountPolicy.mustHaveUniqueEmail(email);

		if (maybeIsEmailUniqueOrError.isErr()) {
			return Err(maybeIsEmailUniqueOrError.unwrapErr());
		}

		const maybeIsEmailUnique = maybeIsEmailUniqueOrError.unwrap();

		if (maybeIsEmailUnique.isViolated()) {
			return Err(AccountError.AccountAlreadyExists);
		}

		// Save account

		const maybeAccountSaved = await this.repository.save(email, password);

		if (maybeAccountSaved.isErr()) {
			return Err(maybeAccountSaved.unwrapErr());
		}

		account = maybeAccountSaved.unwrap();

		this.logger.log(`Account successfully created: ${account}`);

		return Ok(account);
	}
}
