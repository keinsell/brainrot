import {KDF_PROVIDER_TOKEN}                  from "@libraries/security/password-hashing-v2/DI/KDF_PROVIDER_TOKEN.js"
import {KdfAlgorithm, KeyDerivationFunction} from "@libraries/security/password-hashing-v2/KDFs/key-derivation-function.js"
import {PasswordHashingAlgorithm}            from "@libraries/security/password-hashing-v2/password-hashing-algorithm.js"
import {PhcString, SerializedPhcString}      from "@libraries/security/password-hashing-v2/VOs/phc-string.js"
import {Inject, Injectable, Logger}          from "@nestjs/common"



@Injectable()
export class UnifiedPasswordHashing {
	private readonly logger: Logger                                       = new Logger("security:hashing")
	private readonly algorithms: Map<KdfAlgorithm, KeyDerivationFunction> = new Map()


	constructor(@Inject(KDF_PROVIDER_TOKEN) algorithms: KeyDerivationFunction[]) {
		if (algorithms) {
			algorithms.forEach((algorithm) => {
				this.install(algorithm)
			})
		}
	}


	use(algorithm: KdfAlgorithm): PasswordHashingAlgorithm {
		const kdf = this.algorithms.get(algorithm)

		if (!kdf) {
			throw new Error(`Unknown algorithm: ${algorithm}`)
		}

		this.logger.debug(`Using algorithm: ${algorithm}`)

		return new PasswordHashingAlgorithm(kdf)
	}


	install(algorithm: KeyDerivationFunction): void {
		this.algorithms.set(algorithm.name, algorithm)
		this.logger.debug(`Installed algorithm: ${algorithm.name}`)
	}


	uninstall(algorithm: KdfAlgorithm): void {
		this.algorithms.delete(algorithm)
		this.logger.debug(`Uninstalled algorithm: ${algorithm}`)
	}


	which(hash: string): PasswordHashingAlgorithm {
		const algorithm = this.determineAlgorithm(hash)
		return this.use(algorithm)
	}


	private determineAlgorithm(hash: string): KdfAlgorithm {
		const phcString = PhcString.deserialize(hash as unknown as SerializedPhcString)

		const algorithm = Object.values(KdfAlgorithm).find((value) => value === phcString.id)

		if (!algorithm) {
			throw new Error(`Unknown algorithm: ${phcString.id}`)
		}

		this.logger.debug(`Determined algorithm: ${algorithm}`)

		return algorithm
	}
}