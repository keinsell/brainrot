import {
	PasswordHashingModuleV2,
}               from "@libraries/security/password-hashing-v2/password-hashing-module-v2.js"
import {Module} from "@nestjs/common"
import {
	DocumentaitonModule,
}               from "./documentation/documentaiton-module.js"
import {
	ContinuationLocalStorageModule,
}               from "./environment/cls/continuation-local-storage-module.js"
import {
	HealthModule,
}               from "./observability/healthcheck/health-module.js"
import {
	TelemetryModule,
}               from "./observability/telemetry/telemetry-module.js"
import {
	DatabaseModule,
}               from "./storage/database/database.module.js"



@Module({
	imports: [
		TelemetryModule, DatabaseModule, ContinuationLocalStorageModule, DocumentaitonModule, HealthModule,
		PasswordHashingModuleV2,
	],
	exports: [TelemetryModule, DatabaseModule, ContinuationLocalStorageModule, DocumentaitonModule, HealthModule],
})
export class InfrastructureModule {}