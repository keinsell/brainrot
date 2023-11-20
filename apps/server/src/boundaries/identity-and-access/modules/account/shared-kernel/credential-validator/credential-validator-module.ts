import {AccountModule}       from "@boundary/identity-and-access/modules/account/account.module.js"
import {CredentialValidator} from "@boundary/identity-and-access/modules/account/shared-kernel/credential-validator/credential-validator.js"
import {Module}              from "@nestjs/common"



@Module({
	imports:     [AccountModule],
	controllers: [],
	providers:   [
		CredentialValidator,
	],
	exports:     [CredentialValidator],
})
export class CredentialValidatorModule {}