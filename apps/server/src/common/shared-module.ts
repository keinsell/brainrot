import {Module}                         from "@nestjs/common"
import {DocumentaitonModule}            from "./infrastructure/documentation/documentaiton-module.js"
import {DeveloperToolsModule}           from "./infrastructure/environment/dev-tools/developer-tools.module.js"
import {AsyncLocalStorageModule}        from "./infrastructure/environment/local-storage/async-local-storage-module.js"
import {ContinuationLocalStorageModule} from "./infrastructure/environment/local-storage/continuation-local-storage-module.js"
import {HealthModule}                   from "./infrastructure/observability/healthcheck/health-module.js"
import {TelemetryModule}                from "./infrastructure/observability/telemetry/telemetry-module.js"
import {DatabaseModule}                 from "./infrastructure/storage/database/database.module.js"



@Module({
	imports: [
		TelemetryModule, DatabaseModule, ContinuationLocalStorageModule,
		AsyncLocalStorageModule, DocumentaitonModule, HealthModule,
		DeveloperToolsModule,
	],
	exports: [
		TelemetryModule, DatabaseModule, ContinuationLocalStorageModule,
		AsyncLocalStorageModule
		, DocumentaitonModule, HealthModule, DeveloperToolsModule,
	],
})
export class SharedModule {}