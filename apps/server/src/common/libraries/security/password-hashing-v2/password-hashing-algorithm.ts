import {Logger}                         from "@nestjs/common"
import {KeyDerivationFunction}          from "./KDFs/key-derivation-function.js"
import {PhcString, SerializedPhcString} from "./VOs/phc-string.js"
import {Salt}                           from "./VOs/salt.js"



export class PasswordHashingAlgorithm {
	private readonly logger: Logger


	constructor(private readonly kdf: KeyDerivationFunction) {
		this.logger = new Logger(`security:hashing:${kdf.name}`)
	}


	async hash(plain: string, salt?: Salt): Promise<SerializedPhcString> {
		this.preHash(plain)
		const phcString = await this.kdf.deriveKey(plain, salt)
		this.postHash(plain, phcString.serialize())
		return phcString.serialize()
	}


	async verify(hash: string, plain: string): Promise<boolean> {
		this.preVerify(hash, plain)
		const result = await this.kdf.verify(PhcString.deserialize(hash as unknown as SerializedPhcString), plain)
		this.postVerify(hash, plain, result)
		return result
	}


	private preHash(plain: string): void {
		this.logger.debug(`Hashing password ${this.maskPassword(plain)}`)
	}


	private postHash(plain: string, hash: string): void {
		this.logger.debug(`Created hash of password ${this.maskPassword(plain)}: ${this.formatHash(hash)}`)
	}


	private preVerify(hash: string, plain: string): void {
		this.logger.debug(`Verifying password ${this.maskPassword(plain)} against hash ${this.formatHash(hash)}`)
	}


	private postVerify(hash: string, plain: string, result: boolean): void {
		this.logger.debug(`Verified password ${this.maskPassword(plain)} against hash ${this.formatHash(hash)}: ${result ?
			"OK" :
			"FAIL"}`)
	}


	private maskPassword(plain: string): string {
		return plain.slice(0, 3) + "█".repeat(plain.length - 3)
	}


	/** Return last 20 characters of hash */
	private formatHash(hash: string): string {
		return `[...]${hash.slice(-20)}`
	}
}