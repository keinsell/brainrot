import {Module}               from '@nestjs/common';
import {InfrastructureModule} from "./infrastructure/infrastructure.module.js"
import {AccountModule}        from "./modules/account/account.module.js"



@Module({
	imports:     [InfrastructureModule, AccountModule],
	controllers: [],
	providers:   [],
})
export class Container {}
