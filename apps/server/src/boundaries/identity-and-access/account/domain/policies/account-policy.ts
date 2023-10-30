import {IdentityRepository} from "@boundary/identity-and-access/account/domain/repositories/identity-repository.js"
import {Email}              from "@boundary/identity-and-access/account/domain/value-objects/email.js"
import {Username}           from "@boundary/identity-and-access/account/domain/value-objects/username.js"
import {Injectable}         from "@nestjs/common"
import {err, ok, Result}    from "neverthrow"
import {BasePolicy}         from "../../../../../externals/libs/policy/base-policy.js"



@Injectable()
export class AccountPolicy extends BasePolicy {
	constructor(private readonly accountRepository: IdentityRepository) {
		super()
	}


	public isUniqueUsername(username: Username) {
		console.log(username)
	}


	public isUniqueEmail(email: Email): Result<boolean, any> {
		const identity = this.accountRepository.findByEmail(email)

		if (identity) {
			return err("Email is already taken.")
		}

		return ok(true)
	}


	public shouldHaveSecurePassword() {}

}