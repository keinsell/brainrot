import {Module}          from "@nestjs/common"
import {DatabaseModule}  from "./infrastructure/database/database.module.ts"
import {HealthModule}    from "./infrastructure/healthcheck/health-module.ts"
import {TelemetryModule} from "./infrastructure/telemetry/telemetry-module.ts"
import {AccountModule}   from "./modules/account/account-module.ts"


@Module({
	imports    : [HealthModule, DatabaseModule, AccountModule, TelemetryModule],
	controllers: [],
	providers  : [],
	exports    : [],
})
export class MainModule {}