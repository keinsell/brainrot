import {Module}                         from "@nestjs/common"
import {ContinuationLocalStorageModule} from "./cls/continuation-local-storage-module.ts"
import {DatabaseModule}                 from "./database/database.module.ts"
import {TelemetryModule}                from "./telemetry/otel.module.ts"



@Module({
	imports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule],
	exports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule],
})
export class InfrastructureModule {}