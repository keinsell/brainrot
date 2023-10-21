import {Module}                         from "@nestjs/common"
import {ContinuationLocalStorageModule} from "./cls/continuation-local-storage-module.js"
import {DatabaseModule}                 from "./database/database.module.js"
import {DocumentaitonModule}            from "./docs/documentaiton-module.js"
import {HealthModule}                   from "./healthcheck/health-module.js"
import {TelemetryModule}                from "./telemetry/telemetry-module.js"



@Module({
	imports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule, DocumentaitonModule, HealthModule],
	exports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule, DocumentaitonModule, HealthModule],
})
export class InfrastructureModule {}