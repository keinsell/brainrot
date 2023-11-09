import {PasswordAttack} from "@libraries/security/password-strength-estimator/report/password-attack.js"



export type CrackingTime = {
	[key in PasswordAttack]: string
}