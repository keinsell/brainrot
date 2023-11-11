import {PasswordAttack} from "@libraries/security/password-strength-estimator/report/password-attack.js"



/** "less than a second", "3 hours", "centuries", etc. */
export type PasswordAttackTimeDisplay = {
	[key in PasswordAttack]: string
}