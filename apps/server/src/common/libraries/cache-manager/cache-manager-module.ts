import {Module}               from '@nestjs/common';
import {CacheManager}         from "./cache-manager.js"
import {InMemoryCacheManager} from "./in-memory-cache-manager.js"



@Module({
	imports:   [],
	providers: [
		{
			provide:  CacheManager,
			useClass: InMemoryCacheManager,
		},
	],
	exports:   [CacheManager],
})
export class CacheManagerModule {}