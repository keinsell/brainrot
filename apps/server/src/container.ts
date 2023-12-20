import {BillingModule}           from "@boundary/billing/billing.module.js"
import {IdentityAndAccessModule} from "@boundary/identity-and-access/identity-and-access.module.js"
import {Module}                  from '@nestjs/common';
import {EventEmitterModule}      from "@nestjs/event-emitter"
import {SessionMiddlewareModule} from "./common/middleware/session/session-middleware-module.js"
import {SharedModule}            from "./common/shared-module.js"
import {CartModule}              from "./modules/cart/cart-module.js"
import {ProductModule}           from "./modules/product/product-module.js"



@Module({
	imports:     [
		IdentityAndAccessModule, SharedModule, ProductModule, CartModule, BillingModule,
		EventEmitterModule.forRoot(),  SessionMiddlewareModule.forRoot({
			session: {secret: "qwerty"}
		})
	],
	controllers: [],
	providers:   [],
})
export class Container {}