import {KDF_PROVIDER_TOKEN}     from "@libraries/security/password-hashing-v2/DI/KDF_PROVIDER_TOKEN.js"
import {Argon2Kdf}              from "@libraries/security/password-hashing-v2/KDFs/argon2.kdf.js"
import {KeyDerivationFunction}  from "@libraries/security/password-hashing-v2/KDFs/key-derivation-function.js"
import {UnifiedPasswordHashing} from "@libraries/security/password-hashing-v2/unified-password-hashing.js"
import {Module}                 from "@nestjs/common"



@Module({
	imports:     [],
	controllers: [],
	providers:   [
		{
			provide:    KDF_PROVIDER_TOKEN,
			useFactory: (): KeyDerivationFunction[] => {
				return [
					new Argon2Kdf(),
				]
			},
		}, UnifiedPasswordHashing,
	],
	exports:     [UnifiedPasswordHashing],
})
export class PasswordHashingModule {
}