import {IdentityAndAccessModule}                                                          from '@boundary/identity-and-access/identity-and-access.module.js'
import {Logger, MiddlewareConsumer, Module, OnModuleDestroy, OnModuleInit, RequestMethod} from '@nestjs/common'
import {APP_FILTER}                                                                       from "@nestjs/core"
import Sentry                                                                             from '@sentry/node'
import {HttpExceptionFilter}                                                              from "./common/filters/exception-filter/http-exception-filter.js"
import {GraphqlModule}                                                                    from './common/graphql/graphql-module.js'
import {DocumentationModule}                                                              from './common/modules/documentation/documentation-module.js'
import {DeveloperToolsModule}                                                             from './common/modules/environment/dev-tools/developer-tools.module.js'
import {HealthModule}                                                                     from './common/modules/observability/healthcheck/health-module.js'
import {SharedModule}                                                                     from './common/shared-module.js'
import {CartModule}                                                                       from './modules/todo_cart/cart-module.js'
import {ProductModule}                                                                    from './modules/todo_product/product-module.js'
import {RegionModule}                                                                     from './modules/todo_regions/region-module.js'



@Module({
	imports:     [
		GraphqlModule, SharedModule, DocumentationModule, HealthModule, DeveloperToolsModule, IdentityAndAccessModule,
		ProductModule, CartModule, RegionModule,
	],
	controllers: [],
	providers:   [
		{
			provide:  APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class Container implements OnModuleInit, OnModuleDestroy {

	configure(consumer: MiddlewareConsumer) {
		consumer.apply(Sentry.Handlers.requestHandler())
		.forRoutes({
			path:   '*',
			method: RequestMethod.ALL,
		})
		consumer.apply(Sentry.Handlers.tracingHandler())
		.forRoutes({
			path:   '*',
			method: RequestMethod.ALL,
		})
	}


	async onModuleInit() {
		new Logger('Container').log(`Container was built successfully! 📡 `)
	}


	async onModuleDestroy() {
		new Logger('Container').log(`Container was destroyed successfully! 📡 `)
	}
}