import {Module}             from "@nestjs/common"
import {DatabaseModule}     from "./database/database.module.js"
import {LocalstorageModule} from "./localstorage/localstorage.module.js"
import {TelemetryModule}    from "./telemetry/otel.module.js"



@Module({
	imports: [TelemetryModule, DatabaseModule, LocalstorageModule],
	exports: [TelemetryModule, DatabaseModule, LocalstorageModule],
})
export class InfrastructureModule {}