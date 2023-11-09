import {PasswordSecurityReport} from "@libraries/security/password-strength-estimator/report/password-security-report.js"



export abstract class PasswordStrengthEstimator {
	abstract generateReport(password: string): Promise<PasswordSecurityReport>
}