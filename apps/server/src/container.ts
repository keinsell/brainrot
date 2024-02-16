import {Logger, MiddlewareConsumer, Module, OnModuleDestroy, OnModuleInit, RequestMethod} from '@nestjs/common'
import Sentry                                                                             from "@sentry/node"
import {IdentityAndAccessModule} from "./boundaries/identity-and-access/identity-and-access.module.js"
import {GraphqlModule}           from './kernel/graphql/graphql-module.js'
import {DocumentationModule}     from './kernel/modules/documentation/documentation-module.js'
import {DeveloperToolsModule}    from './kernel/modules/environment/dev-tools/developer-tools.module.js'
import {HealthModule}            from './kernel/modules/observability/healthcheck/health-module.js'
import {SharedModule}            from './kernel/shared-module.js'
import {CartModule}              from './mod/todo_cart/cart-module.js'
import {ProductModule} from './mod/todo_product/product-module.js'
import {RegionModule}  from './mod/todo_regions/region-module.js'



@Module({
	imports:     [
		GraphqlModule, SharedModule, DocumentationModule, HealthModule, DeveloperToolsModule, IdentityAndAccessModule,
		ProductModule, CartModule, RegionModule,
	],
	controllers: [],
	providers:   [],
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