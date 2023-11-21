import {CredentialValidator}   from "@boundary/identity-and-access/modules/account/10-application/shared-kernel/credential-validator/credential-validator.js"
import {AccountModule}         from "@boundary/identity-and-access/modules/account/account.module.js"
import {PasswordHashingModule} from "@libraries/security/password-hashing-v2/password-hashing-module.js"
import {Module}                from "@nestjs/common"



@Module({
	imports:     [AccountModule, PasswordHashingModule],
	controllers: [],
	providers:   [
		CredentialValidator,
	],
	exports:     [CredentialValidator],
})
export class CredentialValidatorModule {}