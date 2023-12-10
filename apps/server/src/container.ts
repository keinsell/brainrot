import {BillingModule}           from "@boundary/billing/billing.module.js"
import {IdentityAndAccessModule} from "@boundary/identity-and-access/identity-and-access.module.js"
import {Module}                  from '@nestjs/common';
import {EventEmitterModule}      from "@nestjs/event-emitter"
import {StripeIntegrationModule} from "./common/infrastructure/integrations/stripe-integration/stripe-integration-module.js"
import {SharedModule}            from "./common/shared-module.js"
import {CartModule}              from "./modules/cart/cart-module.js"
import {ProductModule}           from "./modules/product/product-module.js"



@Module({
	imports:     [
		IdentityAndAccessModule, SharedModule, ProductModule, CartModule, BillingModule, StripeIntegrationModule,
		EventEmitterModule.forRoot(),
	],
	controllers: [],
	providers:   [],
})
export class Container {}