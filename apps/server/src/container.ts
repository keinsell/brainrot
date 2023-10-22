import {Module}               from '@nestjs/common';
import {AccountModule}        from "./boundaries/identity-and-access/account/account.module.js"
import {InfrastructureModule} from "./infrastructure/infrastructure.module.js"



@Module({
	imports:     [InfrastructureModule, AccountModule],
	controllers: [],
	providers:   [],
})
export class Container {}
