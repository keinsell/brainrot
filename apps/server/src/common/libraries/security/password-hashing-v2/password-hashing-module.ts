import {Module}                 from "@nestjs/common"
import {KDF_PROVIDER_TOKEN}     from "./DI/KDF_PROVIDER_TOKEN.js"
import {Argon2Kdf}              from "./KDFs/argon2.kdf.js"
import {KeyDerivationFunction}  from "./KDFs/key-derivation-function.js"
import {UnifiedPasswordHashing} from "./unified-password-hashing.js"



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