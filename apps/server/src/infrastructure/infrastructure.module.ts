import {PasswordHashingModule}          from "@libraries/security/password-hashing-v2/password-hashing-module.js"
import {Module}                         from "@nestjs/common"
import {DocumentaitonModule}            from "./documentation/documentaiton-module.js"
import {DeveloperToolsModule}           from "./environment/dev-tools/developer-tools.module.js"
import {AsyncLocalStorageModule}        from "./environment/local-storage/async-local-storage-module.js"
import {ContinuationLocalStorageModule} from "./environment/local-storage/continuation-local-storage-module.js"
import {HealthModule}                   from "./observability/healthcheck/health-module.js"
import {TelemetryModule}                from "./observability/telemetry/telemetry-module.js"
import {DatabaseModule}                 from "./storage/database/database.module.js"



@Module({
	imports: [
		TelemetryModule, DatabaseModule, ContinuationLocalStorageModule,
		AsyncLocalStorageModule, DocumentaitonModule, HealthModule,
		PasswordHashingModule, DeveloperToolsModule,
	],
	exports: [
		TelemetryModule, DatabaseModule, ContinuationLocalStorageModule,
		AsyncLocalStorageModule
		, DocumentaitonModule, HealthModule, DeveloperToolsModule,
	],
})
export class InfrastructureModule {}