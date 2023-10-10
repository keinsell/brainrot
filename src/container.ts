import {Module}               from "@nestjs/common"
import {InfrastructureModule} from "./infrastructure/infrastructure.module.ts"
import {AccountModule}        from "./modules/account/account-module.ts"


@Module({
	imports    : [InfrastructureModule, AccountModule],
	controllers: [],
	providers  : [],
	exports    : [],
})
export class Container {}