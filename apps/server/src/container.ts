import { IdentityAndAccessModule }            from '@boundary/identity-and-access/identity-and-access.module.js'
import {
  Logger,
  MiddlewareConsumer,
  Module,
  OnModuleDestroy,
  OnModuleInit,
  RequestMethod,
}                                             from '@nestjs/common'
import Sentry                                 from '@sentry/node'
import { DocumentationModule }                from './common/modules/documentation/documentation-module.js'
import { DeveloperToolsModule }               from './common/modules/environment/dev-tools/developer-tools.module.js'
import { HealthModule }                       from './common/modules/observability/healthcheck/health-module.js'
import { providePrismaClientExceptionFilter } from './common/modules/resources/prisma/filters/provide-prisma-client-exception-filter.js'
import { SharedModule }                       from './common/shared-module.js'
import { CartModule }                         from './modules/todo_cart/cart-module.js'
import { ProductModule }                      from './modules/todo_product/product-module.js'
import { RegionModule }                       from './modules/todo_regions/region-module.js'



@Module( {
			  imports     : [
				 SharedModule,
				 DocumentationModule,
				 HealthModule,
				 DeveloperToolsModule,
				 IdentityAndAccessModule,
				 ProductModule,
				 CartModule,
				 RegionModule,
			  ],
			  controllers : [],
			  providers   : [
				 providePrismaClientExceptionFilter(),
			  ],
			} )
export class Container
  implements OnModuleInit,
				 OnModuleDestroy
  {

	 configure(consumer : MiddlewareConsumer)
		{
		  consumer.apply( Sentry.Handlers.requestHandler() ).forRoutes( {
																								path   : '*',
																								method : RequestMethod.ALL,
																							 } )
		}

	 async onModuleInit()
		{
		  new Logger( 'Container' ).log( `Container was built successfully! 📡 ` )
		}

	 async onModuleDestroy()
		{
		  new Logger( 'Container' ).log( `Container was destroyed successfully! 📡 ` )
		}
  }