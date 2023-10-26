import {Injectable}                      from "@nestjs/common"
import argon2                            from "argon2"
import {HashingOptions, HashingStrategy} from "../hashing-strategy.js"



@Injectable()
export class Argon2HashingAlgorithm extends HashingStrategy {
	public async compare(value: string, hashedValue: string, options?: HashingOptions): Promise<boolean> {
		return await argon2.verify(hashedValue, value, {
			saltLength: options?.salt.length,
			salt:       options?.salt.salt,
		});
	}


	public async hash(value: string, options?: HashingOptions): Promise<string> {
		return await argon2.hash(value, {
			salt:       options?.salt.salt,
			saltLength: options?.salt.length,
			type:       argon2.argon2id,
		});
	}
}