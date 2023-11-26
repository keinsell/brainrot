import {IdentityRepository}                                 from "@boundary/identity-and-access/modules/account/30-domain/repositories/identity-repository.js"
import {Email}                                              from "@boundary/identity-and-access/modules/account/30-domain/value-objects/email.js"
import {Password}                                           from "@boundary/identity-and-access/modules/account/30-domain/value-objects/password.js"
import {Username}                                           from "@boundary/identity-and-access/modules/account/30-domain/value-objects/username.js"
import {PasswordStrengthEstimator}                          from "@lib/security/password-estimation/password-strength-estimator.js"
import {PasswordSecurityLevel}                              from "@lib/security/password-estimation/report/password-security-level.js"
import {BadRequestException, ConflictException, Injectable} from "@nestjs/common"
import {err, ok}                                            from "neverthrow"
import {BasePolicy}                                         from "../../../../../../common/libraries/domain/policy/base-policy.js"



@Injectable()
export class AccountPolicy extends BasePolicy {
	constructor(private readonly accountRepository: IdentityRepository, private readonly passwordSecurity: PasswordStrengthEstimator) {
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