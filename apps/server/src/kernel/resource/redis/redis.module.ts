import {RedisModule as NestjsRedisModule} from '@liaoliaots/nestjs-redis'
import {
	Global,
	Module,
}                                         from '@nestjs/common'
import {__config}                         from '../../../configs/global/__config.js'



@Global() @Module({
	                  imports: [
		                  NestjsRedisModule.forRoot({
			                                            config: {
				                                            host    : __config.get('redis').host,
				                                            port    : __config.get('redis').port,
				                                            username: __config.get('redis').username,
				                                            password: __config.get('redis').password,
				                                            url     : __config.get('redis').url,
			                                            },
		                                            }),
	                  ],
                  })
export class RedisModule
{
}
