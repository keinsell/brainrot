import {PasswordHashingAlgorithm}  from "../../../../../../common/libraries/security/hashing/password-hashing-algorithm.js"
import {PhcString}                 from "../../../../../../common/libraries/security/hashing/types/phc-string.js"
import {PasswordStrengthEstimator} from "../../../../../../common/libraries/security/password-estimation/password-strength-estimator.js"
import {PasswordSecurityReport}    from "../../../../../../common/libraries/security/password-estimation/report/password-security-report.js"



interface PasswordProperties {
	hash: PhcString
	plain?: string
	report?: PasswordSecurityReport
}


export class Password implements PasswordProperties {
	hash: PhcString
	plain?: string
	report?: PasswordSecurityReport


	private constructor(payload: PasswordProperties) {
		this.hash   = payload.hash
		this.plain  = payload.plain
		this.report = payload.report
	}


	static fromHash(hash: PhcString): Password {
		return new Password({
			hash,
		})
	}


	static async fromPlain(plain: string, hashingService: PasswordHashingAlgorithm): Promise<Password> {
		const hash = await hashingService.hash(plain)
		return new Password({
			hash: PhcString.deserialize(hash),
			plain,
		})
	}


	public async compare(plain: string, hashingService: PasswordHashingAlgorithm): Promise<boolean> {
		return hashingService.verify(this.hash.serialize(), plain)
	}


	public async generateReport(passwordStrengthEstimator: PasswordStrengthEstimator): Promise<PasswordSecurityReport> {
		if (!this.plain) {
			throw new Error("Cannot generate report for a password that was not created from plain text.")
		}

		return await passwordStrengthEstimator.generateReport(this.plain)
	}


	public addReport(report: PasswordSecurityReport): Password {
		this.report = report
		return this
	}
}