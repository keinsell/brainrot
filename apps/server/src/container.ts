import {
	Logger,
	MiddlewareConsumer,
	Module,
	OnModuleDestroy,
	OnModuleInit,
	RequestMethod,
}                                                 from '@nestjs/common'
import Sentry                                     from '@sentry/node'
import {DocumentationModule}                      from './common/modules/documentation/documentation-module.js'
import {DeveloperToolsModule}                     from './common/modules/environment/dev-tools/developer-tools.module.js'
import {HealthModule}                             from './common/modules/observability/healthcheck/health-module.js'
import {CacheManagerModule}                       from './common/modules/storage/cache-manager/cache-manager-module.js'
import {SharedModule}                             from './common/shared-module.js'
import {CartController}                           from './http/v1/cart.js'
import {ComputeController}                        from './http/v1/compute.js'
import {GraphqlModule}                            from './kernel/platform/gql/graphql-module.js'
import { FingerprintModule }                      from './kernel/platform/http/middleware/fingerprint.js';
import {CertificateBasedAuthenticationController} from './mod/identity/cbac/cbac.js'
import {SingleSignOnController}                   from './mod/identity/sso/sso.js'
import {CartModule}                               from './modules/todo_cart/cart-module.js'
import {ProductModule}                            from './modules/todo_product/product-module.js'
import {RegionModule}                             from './modules/todo_regions/region-module.js'



@Module({
	        imports    : [
		        GraphqlModule,
		        SharedModule,
		        DocumentationModule,
		        HealthModule,
		        DeveloperToolsModule,
		        ProductModule,
		        CartModule,
		        RegionModule,
		        CacheManagerModule,
		        FingerprintModule.forRoot(),
	        ],
	        controllers: [
		        SingleSignOnController,
		        CertificateBasedAuthenticationController,
		        ComputeController,
		        CartController,
	        ],
	        providers  : [
		        //		        {
		        //			        provide : APP_INTERCEPTOR,
		        //			        useClass: CacheInterceptor,
		        //		        },
	        ],
        })
export class Container
	implements OnModuleInit,
	           OnModuleDestroy
{

	configure(consumer: MiddlewareConsumer)
	{
		consumer.apply(Sentry.Handlers.requestHandler())
		        .forRoutes({
			                   path  : '*',
			                   method: RequestMethod.ALL,
		                   })
		consumer.apply(Sentry.Handlers.tracingHandler())
		        .forRoutes({
			                   path  : '*',
			                   method: RequestMethod.ALL,
		                   })
	}


	async onModuleInit()
	{
		new Logger('Container').log(`Container was built successfully! 📡 `)
	}


	async onModuleDestroy()
	{
		new Logger('Container').log(`Container was destroyed successfully! 📡 `)
	}
}
