import {Module}                         from "@nestjs/common"
import {ContinuationLocalStorageModule} from "./cls/continuation-local-storage-module.js"
import {DatabaseModule}                 from "./database/database.module.js"
import {TelemetryModule}                from "./telemetry/otel.module.js"



@Module({
	imports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule],
	exports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule],
})
export class InfrastructureModule {}