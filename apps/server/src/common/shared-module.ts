import {Module}                         from "@nestjs/common"
import {DocumentaitonModule}            from "./modules/documentation/documentaiton-module.js"
import {DeveloperToolsModule}           from "./modules/environment/dev-tools/developer-tools.module.js"
import {AsyncLocalStorageModule}        from "./modules/environment/local-storage/async-local-storage-module.js"
import {ContinuationLocalStorageModule} from "./modules/environment/local-storage/continuation-local-storage-module.js"
import {HealthModule}                   from "./modules/observability/healthcheck/health-module.js"
import {TelemetryModule}                from "./modules/observability/telemetry/telemetry-module.js"
import {DatabaseModule}                 from "./modules/storage/database/database.module.js"



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