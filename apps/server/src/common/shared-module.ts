import {Module}                         from "@nestjs/common"
import {SessionMiddlewareModule}        from "./middleware/session/session-middleware-module.js"
import {DocumentaitonModule}            from "./modules/documentation/documentaiton-module.js"
import {DeveloperToolsModule}           from "./modules/environment/dev-tools/developer-tools.module.js"
import {AsyncLocalStorageModule}        from "./modules/environment/local-storage/async-local-storage-module.js"
import {ContinuationLocalStorageModule} from "./modules/environment/local-storage/continuation-local-storage-module.js"
import {HealthModule}                   from "./modules/observability/healthcheck/health-module.js"
import {TelemetryModule}                from "./modules/observability/telemetry/telemetry-module.js"
import {DatabaseModule}                 from "./modules/storage/database/database.module.js"



@Module({
	imports  : [
		TelemetryModule,
		DatabaseModule,
		ContinuationLocalStorageModule,
		AsyncLocalStorageModule,
		DocumentaitonModule,
		HealthModule,
		DeveloperToolsModule,
		SessionMiddlewareModule.forRoot({
			session: {
				secret           : "secretomitted",
				rolling          : false,
				resave           : false,
				saveUninitialized: false,
			},
		}), // https://stackoverflow.com/questions/56046527/express-session-req-session-touch-not-a-function
		//CookieSessionModule.forRoot({
		//	session: {
		//		name: 'session', secret: 'secretomitted', maxAge: 0
		//	}
		//})
	],
	providers: [],
	exports  : [
		TelemetryModule,
		DatabaseModule,
		ContinuationLocalStorageModule,
		AsyncLocalStorageModule,
		DocumentaitonModule,
		HealthModule,
		DeveloperToolsModule,
	],
})
export class SharedModule {
}