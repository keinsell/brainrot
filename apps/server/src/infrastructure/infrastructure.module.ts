import {Module}                         from "@nestjs/common"
import {ContinuationLocalStorageModule} from "./cls/continuation-local-storage-module.js"
import {DatabaseModule}                 from "./database/database.module.js"
import {DocumentaitonModule}            from "./docs/documentaiton-module.js"
import {TelemetryModule}                from "./telemetry/otel.module.js"



@Module({
	imports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule, DocumentaitonModule],
	exports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule, DocumentaitonModule],
})
export class InfrastructureModule {}