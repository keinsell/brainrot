import {Logger}         from '@nestjs/common'
import {seeder}         from './kernel/libraries/seeder/seeder.js'
import {DatabaseModule} from './kernel/modules/database/database.module.js'
import {AccountModule}  from './mod/account/account.module.js'
import {AccountSeeder}  from './mod/account/repositories/account-seeder.js'
import {RoleSeeder}     from './mod/role/seeder/role-seeder.js'
import {CartSeeder}     from './mod/todo_cart/cart-seeder.js'
import {ProductSeeder}  from './mod/todo_product/seed/product-seeder.js'
import {ProfileSeeder}  from './mod/todo_profile/infrastructure/profile-seeder.js'



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
