import {PasswordHashingAlgorithm} from "@libraries/security/password-hashing/model/password-hashing-algorithm.js"
import {Salt}                     from "@libraries/security/password-hashing/model/salt.js"
import {PasswordHashing}          from "@libraries/security/password-hashing/password-hashing.js"



export class Password {
	private constructor(private readonly passwordHash: string, private readonly _salt: Salt, private algorithm: PasswordHashingAlgorithm) {}


	get salt(): string {
		return this._salt.toString('base64')
	}

	get hash(): string {
		return this.passwordHash
	}


	static fromHash(hash: string, salt: Salt, algorithm: PasswordHashingAlgorithm): Password {
		return new Password(hash, salt, PasswordHashingAlgorithm.ARGON2ID)
	}


	static async fromPlain(plain: string, hashingService: PasswordHashing): Promise<Password> {
		const hashed = await hashingService.hashPassword(plain, await hashingService.generateSalt())
		return new Password(hashed.hash, hashed.salt, hashingService.ALGORITHM)
	}


	public async compare(
		plain: string,
		hashingService: PasswordHashing
	): Promise<boolean> {
		return hashingService.comparePassword(plain, this.passwordHash, this._salt)
	}
}