import {BillingModule}           from "@boundary/billing/billing.module.js"
import {IdentityAndAccessModule} from "@boundary/identity-and-access/identity-and-access.module.js"
import {Module}                  from '@nestjs/common';
import {SharedModule}            from "./common/shared-module.js"
import {CartModule}              from "./modules/cart/cart-module.js"
import {ProductModule}           from "./modules/product/product-module.js"



@Module({
	imports:     [
		IdentityAndAccessModule, SharedModule, ProductModule,
		CartModule, BillingModule,
	],
	controllers: [],
	providers:   [],
})
export class Container {}