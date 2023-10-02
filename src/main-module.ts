import {Module}         from "@nestjs/common"
import {DatabaseModule} from "./infrastructure/database/database.module.ts"
import {HealthModule}   from "./infrastructure/healthcheck/health-module.ts"
import {AccountModule}  from "./modules/account/account-module.ts"


@Module({
	imports    : [HealthModule, DatabaseModule, AccountModule],
	controllers: [],
	providers  : [],
	exports    : [],
})
export class MainModule {}