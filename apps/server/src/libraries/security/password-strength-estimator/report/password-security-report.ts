import {CrackingTimeDisplay}   from "@libraries/security/password-strength-estimator/report/cracking-time-display.js"
import {CrackingTime}          from "@libraries/security/password-strength-estimator/report/cracking-time.js"
import {PasswordFeedback}      from "@libraries/security/password-strength-estimator/report/password-feedback.js"
import {PasswordSecurityLevel} from "@libraries/security/password-strength-estimator/report/password-security-level.js"



export class PasswordSecurityReport {
	public feedback: PasswordFeedback
	public crackingTime: CrackingTime
	public crackingTimeDisplay: CrackingTimeDisplay
	public score: PasswordSecurityLevel


	isScoreHigherThan(score: PasswordSecurityLevel) {
		const scoreMapping: {
			[key in PasswordSecurityLevel]: number
		} = {
			0: 0,
			1: 1,
			2: 2,
			3: 3,
			4: 4,
		}

		const actualScore   = scoreMapping[this.score]
		const expectedScore = scoreMapping[score]

		return actualScore > expectedScore
	}


	isScoreLowerThan(score: PasswordSecurityLevel) {
		const scoreMapping: {
			[key in PasswordSecurityLevel]: number
		} = {
			0: 0,
			1: 1,
			2: 2,
			3: 3,
			4: 4,
		}

		const actualScore   = scoreMapping[this.score]
		const expectedScore = scoreMapping[score]

		return actualScore < expectedScore
	}
}