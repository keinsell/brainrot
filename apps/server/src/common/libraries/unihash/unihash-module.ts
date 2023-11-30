import {Module}                from "@nestjs/common"
import {KDF_PROVIDER_TOKEN}    from "./constraints/KDF_PROVIDER_TOKEN.js"
import {Argon2Kdf}             from "./key-derivation-functions/argon2.kdf.js"
import {KeyDerivationFunction} from "./key-derivation-functions/key-derivation-function.js"
import {Unihash}               from "./unihash.js"



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
		}, Unihash,
	],
	exports:     [Unihash],
})
export class UnihashModule {
}