import {Module}                         from "@nestjs/common"
import {SessionMiddlewareModule}        from "./middleware/session/session-middleware-module.js"
import {DocumentationModule}            from "./modules/documentation/documentation-module.js"
import {DeveloperToolsModule}           from "./modules/environment/dev-tools/developer-tools.module.js"
import {AsyncLocalStorageModule}        from "./modules/environment/local-storage/async-local-storage-module.js"
import {ContinuationLocalStorageModule} from "./modules/environment/local-storage/continuation-local-storage-module.js"
import {HealthModule}                   from "./modules/observability/healthcheck/health-module.js"
import {ObservabilityModule}            from "./modules/observability/observability-module.js"
import {DatabaseModule}                 from "./modules/database/database.module.js"
import {ConfigModule}                   from "../configs/config-module.js";



@Module({
	imports  : [
		ConfigModule.forRoot(),
		ObservabilityModule,
		DatabaseModule,
		ContinuationLocalStorageModule,
		AsyncLocalStorageModule,
		DocumentationModule,
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
		ObservabilityModule,
		DatabaseModule,
		ContinuationLocalStorageModule,
		AsyncLocalStorageModule,
		DocumentationModule,
		HealthModule,
		DeveloperToolsModule,
		ConfigModule,
	],
})
export class SharedModule {
}