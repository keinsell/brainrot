import {Module}          from "@nestjs/common"
import {DatabaseModule}  from "./database/database.module.ts"
import {HealthModule}    from "./healthcheck/health-module.ts"
import {LoggerModule}    from "./loggger/logger-module.ts"
import {TelemetryModule} from "./telemetry/telemetry-module.ts"

@Module({
	imports: [HealthModule, DatabaseModule, TelemetryModule, LoggerModule],
	exports: [HealthModule, DatabaseModule, TelemetryModule, LoggerModule],
})
export class InfrastructureModule {}