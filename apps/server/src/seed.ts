import {Logger}         from '@nestjs/common'
import {seeder}         from './common/lib/seeder/seeder.js'
import {DatabaseModule} from './common/modules/database/database.module.js'
import {AccountModule} from './modules/account/account.module.js'
import {AccountSeeder} from './modules/account/repositories/account-seeder.js'
import {RoleSeeder}    from './modules/role/seeder/role-seeder.js'
import {CartSeeder}    from './modules/todo_cart/cart-seeder.js'
import {ProductSeeder} from './modules/todo_product/seed/product-seeder.js'
import {ProfileSeeder} from './modules/todo_profile/infrastructure/profile-seeder.js'



try
	{
		seeder({
			       imports  : [
				       DatabaseModule,
				       AccountModule,
			       ],
			       providers: [
				       ProductSeeder,
				       AccountSeeder,
				       ProfileSeeder,
				       RoleSeeder,
			       ],
		       })
		.run([
			     ProductSeeder,
			     AccountSeeder,
			     ProfileSeeder,
			     CartSeeder,
			     RoleSeeder,
		     ])
	}
catch (e)
	{
		new Logger('seed').error(`Error while trying to seed database:" 
				           + " ${(e as unknown as any).message}`)
	}
