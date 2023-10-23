import {Module}                         from "@nestjs/common"
import {DocumentaitonModule}            from "./documentation/documentaiton-module.js"
import {ContinuationLocalStorageModule} from "./environment/cls/continuation-local-storage-module.js"
import {HealthModule}                   from "./observability/healthcheck/health-module.js"
import {TelemetryModule}                from "./observability/telemetry/telemetry-module.js"
import {DatabaseModule}                 from "./storage/database/database.module.js"



@Module({
	imports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule, DocumentaitonModule, HealthModule],
	exports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule, DocumentaitonModule, HealthModule],
})
export class InfrastructureModule {}