import {IdentityAndAccessModule} from "@boundary/identity-and-access/identity-and-access.module.js"
import {Module}                  from '@nestjs/common';
import {InfrastructureModule}    from "./common/infrastructure/infrastructure.module.js"
import {CartModule}              from "./modules/cart/cart-module.js"
import {InventoryModule}         from "./modules/inventory/inventory-module.js"
import {ProductModule}           from "./modules/product/product-module.js"



@Module({
	imports: [
		IdentityAndAccessModule, InfrastructureModule, ProductModule,
		InventoryModule, CartModule,
	],
	controllers: [],
	providers:   [],
})
export class Container {}