import {AccountModule}       from "@iam/account/account.module.js"
import {CredentialValidator} from "@iam/account/shared-kernel/credential-validator/credential-validator.js"
import {Module}              from "@nestjs/common"



@Module({
	imports:     [AccountModule],
	controllers: [],
	providers:   [
	 CredentialValidator
	],
	exports:     [CredentialValidator],
})
export class CredentialValidatorModule {}