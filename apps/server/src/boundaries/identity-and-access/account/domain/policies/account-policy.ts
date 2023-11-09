import {IdentityRepository}            from "@boundary/identity-and-access/account/domain/repositories/identity-repository.js"
import {Email}                         from "@boundary/identity-and-access/account/domain/value-objects/email.js"
import {Username}                      from "@boundary/identity-and-access/account/domain/value-objects/username.js"
import {ConflictException, Injectable} from "@nestjs/common"
import {err, ok}                       from "neverthrow"
import {BasePolicy}                    from "../../../../../libraries/policy/base-policy.js"



@Injectable()
export class AccountPolicy extends BasePolicy {
	constructor(private readonly accountRepository: IdentityRepository) {
		super()
	}


	public async isUniqueUsername(username: Username) {
		const identity = await this.accountRepository.findByUsername(username)

		if (identity) {
			return err(new ConflictException("Username is already in use in system, try logging in instead."))
		}

		return ok(true)
	}


	public async isUniqueEmail(email: Email) {
		const identity = await this.accountRepository.findByEmail(email)

		if (identity) {
			return err(new ConflictException("Email is already in use in system, try logging in instead."))
		}

		return ok(true)
	}


	public shouldHaveSecurePassword() {}

}