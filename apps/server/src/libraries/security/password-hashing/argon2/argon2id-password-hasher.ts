import {Argon2Hash}               from "@libraries/security/password-hashing/argon2/argon2-hash.js"
import {Hash}                     from "@libraries/security/password-hashing/model/hash.js"
import {PasswordHashingAlgorithm} from "@libraries/security/password-hashing/model/password-hashing-algorithm.js"
import {Salt}                     from "@libraries/security/password-hashing/model/salt.js"
import {PasswordHashing}          from "@libraries/security/password-hashing/password-hashing.js"
import {Injectable, Logger}       from "@nestjs/common"
import * as argon2                from "argon2"



@Injectable()
export class Argon2idPasswordHasher extends PasswordHashing {
	public readonly ALGORITHM: PasswordHashingAlgorithm = PasswordHashingAlgorithm.ARGON2ID


	public async comparePassword(password: string, hashedPassword: Argon2Hash, salt?: Salt): Promise<boolean> {
		const compareResult = await argon2.verify(hashedPassword, password, {salt: salt})

		this.logger.debug(`Compared password "${password.slice(0,3)}..." with salt "${salt.toString('base64').slice(0,8)}..." to "...${hashedPassword.slice(hashedPassword.length - 8, hashedPassword.length)}" => ${compareResult}`)

		return compareResult
	}


	public async hashPassword(password: string, salt: Salt): Promise<Hash> {
		const hashString = await argon2.hash(password, {salt})

		this.logger.debug(`Hashed password "${password.slice(0,3)}..." with salt "${salt.toString('base64').slice(0,8)}..." to "...${hashString.slice(hashString.length - 8, hashString.length)}"`)

		return {
			algorithm: PasswordHashingAlgorithm.ARGON2ID,
			hash: hashString as Argon2Hash,
			salt: salt
		}
	}


	private logger: Logger = new Logger("hashing:argon2id")
}