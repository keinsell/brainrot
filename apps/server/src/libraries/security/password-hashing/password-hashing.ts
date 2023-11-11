import {Salt}                     from "@libraries/security/password-hashing-v2/VOs/salt.js"
import {Argon2Hash}               from "@libraries/security/password-hashing/argon2/argon2-hash.js"
import {Hash}                     from "@libraries/security/password-hashing/model/hash.js"
import {PasswordHashingAlgorithm} from "@libraries/security/password-hashing/model/password-hashing-algorithm.js"
import bcrypt                     from 'bcrypt';



export abstract class PasswordHashing {
	abstract readonly ALGORITHM: PasswordHashingAlgorithm

	abstract hashPassword(password: string, salt: Salt): Promise<Hash>

	abstract comparePassword(password: string, hashedPassword: Argon2Hash, salt?: Salt): Promise<boolean>
	async generateSalt(rounds: number = 13): Promise<Salt> {
		const salt = bcrypt.genSaltSync(rounds)
		return Buffer.from(salt, 'base64')
	}
}

