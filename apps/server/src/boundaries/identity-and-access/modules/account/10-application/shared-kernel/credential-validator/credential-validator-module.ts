import {CredentialValidator} from "@boundary/identity-and-access/modules/account/10-application/shared-kernel/credential-validator/credential-validator.js"
import {AccountModule}       from "@boundary/identity-and-access/modules/account/account.module.js"
import {UnihashModule}       from "../../../../../../../common/libraries/unihash/unihash-module.js"
import {Module}              from "@nestjs/common"



@Module({
	imports:     [AccountModule, UnihashModule],
	controllers: [],
	providers:   [
		CredentialValidator,
	],
	exports:     [CredentialValidator],
})
export class CredentialValidatorModule {}