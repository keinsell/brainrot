import {IdentityAndAccessModule}                                                          from "@boundary/identity-and-access/identity-and-access.module.js"
import {Logger, MiddlewareConsumer, Module, OnModuleDestroy, OnModuleInit, RequestMethod} from '@nestjs/common';
import {EventEmitterModule}                                                               from "@nestjs/event-emitter"
import {
	SessionMiddlewareModule,
}                                                                                         from "./common/middleware/session/session-middleware-module.js"
import {
	SharedModule,
}                                                                                         from "./common/shared-module.js"
import {
	CartModule,
}                                                                                         from "./modules/todo_cart/cart-module.js"
import {
	ProductModule,
}                                                                                         from "./modules/todo_product/product-module.js"
import {
	RegionModule,
}                                                                                         from "./modules/todo_regions/region-module.js"
import Sentry                                                                             from "@sentry/node";
import {
	providePrismaClientExceptionFilter,
}                                                                                         from "./common/modules/resources/prisma/filters/provide-prisma-client-exception-filter.js";



@Module({
	imports    : [
		IdentityAndAccessModule,
		SharedModule,
		ProductModule,
		CartModule,
		EventEmitterModule.forRoot(),
		RegionModule,
		SessionMiddlewareModule.forRoot({
			session: {secret: "qwerty"},
		}),
	],
	controllers: [],
	providers  : [
		providePrismaClientExceptionFilter(),
	],
})
export class Container
	implements OnModuleInit, OnModuleDestroy {

	configure(consumer : MiddlewareConsumer) {
		consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
			path  : '*',
			method: RequestMethod.ALL,
		});
	}

	async onModuleInit() {
		new Logger("Container").log(`Container was built successfully! 📡 `);
	}

	async onModuleDestroy() {
		new Logger("Container").log(`Container was destroyed successfully! 📡 `);
	}
}