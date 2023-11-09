import {Argon2Hash}               from "@libraries/security/password-hashing/argon2/argon2-hash.js"
import {PasswordHashingAlgorithm} from "@libraries/security/password-hashing/model/password-hashing-algorithm.js"
import {Salt}                     from "@libraries/security/password-hashing/model/salt.js"



export type Hash = {
	algorithm: PasswordHashingAlgorithm
	salt?: Salt
	hash: Argon2Hash
};