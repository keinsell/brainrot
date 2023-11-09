import {
	KdfAlgorithm, KeyDerivationFunction,
}                                       from "@libraries/security/password-hashing-v2/KDFs/key-derivation-function.js"
import {PhcString, SerializedPhcString} from "@libraries/security/password-hashing-v2/VOs/phc-string.js"
import {Salt}                           from "@libraries/security/password-hashing-v2/VOs/salt.js"
import {Injectable}                     from "@nestjs/common"
import * as argon2                      from "argon2"



@Injectable()
export class Argon2Kdf implements KeyDerivationFunction {
	public async deriveKey(password: string, salt: Salt, options?: any): Promise<PhcString> {
		const hashOfString = await argon2.hash(password, {
			salt: salt, ...options,
			type: 2,
		})

		return PhcString.deserialize(hashOfString as unknown as SerializedPhcString)
	}


	public name: KdfAlgorithm = KdfAlgorithm.Argon2id


	public async verify(hash: PhcString, plain: string): Promise<boolean> {
		return argon2.verify(hash.serialize(), plain)
	}
}