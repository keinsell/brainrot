import {Argon2idPasswordHasher} from "@libraries/security/password-hashing/argon2/argon2id-password-hasher.js"
import {PasswordHashing}        from "@libraries/security/password-hashing/password-hashing.js"
import {Module}                 from "@nestjs/common"



@Module({
	imports:     [],
	controllers: [],
	providers:   [
		Argon2idPasswordHasher,
		{provide: PasswordHashing, useClass: Argon2idPasswordHasher},
	],
	exports:     [PasswordHashing],
})
export class PasswordHashingModule {}