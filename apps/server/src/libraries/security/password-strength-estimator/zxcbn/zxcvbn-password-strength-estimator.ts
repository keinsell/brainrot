import {PasswordStrengthEstimator} from "@libraries/security/password-strength-estimator/password-strength-estimator.js"
import {PasswordSecurityReport}    from "@libraries/security/password-strength-estimator/report/password-security-report.js"
import {Injectable}                from "@nestjs/common"



@Injectable()
export class ZxcvbnPasswordStrengthEstimator extends PasswordStrengthEstimator {
	public generateReport(password: string): Promise<PasswordSecurityReport> {
		throw new Error("Method not implemented." + password)
	}
}