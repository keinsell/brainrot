import {BadRequestException, ConflictException, Injectable} from "@nestjs/common"
import {err, ok}                                            from "neverthrow"
import {BasePolicy}                                         from "../../../common/libraries/domain/policy/base-policy.js"
import {Pwnproc}                                            from "../../../common/libraries/pwnproc/pwnproc.js"
import {PasswordSecurityLevel}                              from "../../../common/libraries/pwnproc/report/password-security-level.js"
import {AccountRepository}                                  from "../repositories/account-repository.js"
import {Email}                                              from "../value-objects/email.js"
import {Password}                                           from "../value-objects/password.js"
import {Username}                                           from "../value-objects/username.js"



@Injectable()
export class AccountPolicy extends BasePolicy {
	constructor(private readonly accountRepository: AccountRepository, private readonly passwordSecurity: Pwnproc) {
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


	public async shouldHaveSecurePassword(password: Password) {
		const report = await password.generateReport(this.passwordSecurity)

		password.addReport(report)

		if (report.isScoreHigherThan(PasswordSecurityLevel.WEAK)) {
			return ok(true)
		}
		else {
			return err(new BadRequestException("Password is insecure enough."))
		}
	}
}