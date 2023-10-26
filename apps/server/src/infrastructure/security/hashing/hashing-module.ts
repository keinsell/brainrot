import {Module}                 from "@nestjs/common"
import {Argon2HashingAlgorithm} from "./algorithms/argon2-hashing-algorithm.js"
import {HashingStrategy}        from "./hashing-strategy.js"



@Module({
	providers: [
		{
			provide:  HashingStrategy,
			useClass: Argon2HashingAlgorithm,
		},
	],
	exports:   [HashingStrategy],
})
export class HashingModule {}