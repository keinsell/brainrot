import {PasswordSecurityReport} from "./report/password-security-report.js"



export abstract class PasswordStrengthEstimator {
	abstract generateReport(password: string): Promise<PasswordSecurityReport>
}