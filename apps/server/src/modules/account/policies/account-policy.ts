import {BadRequestException, ConflictException, Injectable, Logger} from "@nestjs/common"
import {err, ok}                                                    from "neverthrow"
import {
	BasePolicy,
}                                                                   from "../../../common/libraries/domain/policy/base-policy.js"
import {Pwnproc}                                                    from "../../../common/libraries/pwnproc/pwnproc.js"
import {
	PasswordSecurityLevel,
}                                                                   from "../../../common/libraries/pwnproc/report/password-security-level.js"
import {AccountRepository}                                          from "../repositories/account-repository.js"



@Injectable()
export class AccountPolicy
	extends BasePolicy {
	private logger : Logger = new Logger("account::policy")


	constructor(private readonly accountRepository : AccountRepository, private readonly passwordSecurity : Pwnproc) {
		super()
	}


	public async canRegisterAccount(registerAccount : {
		email : string, username : string, password : string,
	})
	{
		this.logger.verbose(`Validating 'canRegisterAccount' policy for: ${JSON.stringify(registerAccount)}`)

		const isUniqueUsername = await this.isUniqueUsername(registerAccount.username)
		const isUniqueEmail = await this.isUniqueEmail(registerAccount.email)
		const isSecurePassword = await this.isSecurePassword(registerAccount.password)

		const maybePolicy = this.merge(isUniqueUsername, isUniqueEmail, isSecurePassword)

		this.logger.debug(`Validated 'canRegisterAccount' policy => ${JSON.stringify(maybePolicy)}`)

		if (maybePolicy.isErr()) {
			throw maybePolicy.error
		}
		else {
			return maybePolicy.value
		}
	}


	private async isUniqueUsername(username : string) {
		const identity = await this.accountRepository.findByUsername(username)

		if (identity) {
			return err(new ConflictException("Username is already in use in system, try logging in instead."))
		}

		return ok(true)
	}


	private async isUniqueEmail(email : string) {
		const identity = await this.accountRepository.findByEmail(email)

		if (identity) {
			const error = new ConflictException("Email is already in use in system, try logging in instead.")
			return err(error)
		}

		return ok(true)
	}


	private async isSecurePassword(password : string) {
		const report = await this.passwordSecurity.generateReport(password)

		if (report.isScoreHigherThan(PasswordSecurityLevel.WEAK)) {
			return ok(true)
		}
		else {
			const error = new BadRequestException("Password is insecure enough.")
			return err(error)
		}
	}
}