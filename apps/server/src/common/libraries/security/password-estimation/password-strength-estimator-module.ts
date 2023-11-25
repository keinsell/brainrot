import {Global, Module}                  from "@nestjs/common"
import {PasswordStrengthEstimator}       from "./password-strength-estimator.js"
import {ZxcvbnPasswordStrengthEstimator} from "./zxcbn/zxcvbn-password-strength-estimator.js"



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