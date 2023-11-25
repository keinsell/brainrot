import {CredentialValidator}   from "@boundary/identity-and-access/modules/account/10-application/shared-kernel/credential-validator/credential-validator.js"
import {AccountModule}         from "@boundary/identity-and-access/modules/account/account.module.js"
import {Module}                from "@nestjs/common"
import {PasswordHashingModule} from "../../../../../../../common/libraries/security/hashing/password-hashing-module.js"



@Module({
	imports:     [AccountModule, PasswordHashingModule],
	controllers: [],
	providers:   [
		CredentialValidator,
	],
	exports:     [CredentialValidator],
})
export class CredentialValidatorModule {}