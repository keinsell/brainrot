import {Injectable}              from "@nestjs/common"
import {Err, Ok, Result}         from "oxide.ts"
import {PolicyResult}            from "../../libs/policy/policy-result.js"
import {AccountError}            from "./account-error.js"
import {PrismaAccountRepository} from "./account-repository.js"



@Injectable()
export class AccountPolicy {
	constructor(
		private accountRepository: PrismaAccountRepository,
	) {}

	async mustHaveUniqueEmail(email: string): Promise<Result<PolicyResult, typeof AccountError.AccountNotFound>> {
		const maybeAccountOrError = await this.accountRepository.findByEmail(email);

		if (maybeAccountOrError.isErr()) {
			return Err(maybeAccountOrError.unwrapErr())
		}

		const maybeAccount = maybeAccountOrError.unwrap()

		if (maybeAccount.isSome()) {
			return Ok(PolicyResult.fail())
		}

		return Ok(PolicyResult.ok())
	}
}