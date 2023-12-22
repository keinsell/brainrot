import {Module}       from "@nestjs/common"
import {env}          from "../../../../configs/env.js"
import {SentryModule} from "../../sentry/sentry-module.js"



@Module({
	imports: [
		SentryModule.forRoot({
			dsn:                 env.SENTRY_DSN,
			autoSessionTracking: true,
			tracesSampleRate:    1.0,
			enableTracing:       true,
			enabled:             true,
			instrumenter:        "sentry",
		}), //OpenTelemetryModule.forRoot({
		//	traceAutoInjectors:  [
		//		ControllerInjector, GuardInjector, EventEmitterInjector, ScheduleInjector, PipeInjector,
		//		ConsoleLoggerInjector, GraphQLResolverInjector,
		//	],
		//	autoDetectResources: true,
		//	instrumentations:    [...OpenTelemetryModuleDefaultConfig.instrumentations],
		//}),
	],
	exports: [],
})
export class TelemetryModule {
}

