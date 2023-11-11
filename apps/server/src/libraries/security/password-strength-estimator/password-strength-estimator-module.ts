import {PasswordStrengthEstimator}       from "@libraries/security/password-strength-estimator/password-strength-estimator.js"
import {ZxcvbnPasswordStrengthEstimator} from "@libraries/security/password-strength-estimator/zxcbn/zxcvbn-password-strength-estimator.js"
import {Global, Module}                  from "@nestjs/common"



@Global() @Module({
	imports:   [],
	providers: [
		{
			provide:  PasswordStrengthEstimator,
			useClass: ZxcvbnPasswordStrengthEstimator,
		},
	],
	exports:   [PasswordStrengthEstimator],
})
export class PasswordStrengthEstimatorModule {}