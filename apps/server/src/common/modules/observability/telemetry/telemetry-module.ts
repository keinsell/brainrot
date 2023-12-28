import {Module}                           from "@nestjs/common"
import {env}                              from "../../../../configs/env.js"
import {SentryModule}                     from "../../sentry/sentry-module.js"
import {OpenTelemetryModule}              from "../../opentelemetry/open-telemetry-module.js";
import {ControllerInjector}               from "../../opentelemetry/injector/controller-injector.js";
import {GuardInjector}                    from "../../opentelemetry/injector/guard-injector.js";
import {EventEmitterInjector}             from "../../opentelemetry/injector/event-emitter-injector.js";
import {ScheduleInjector}                 from "../../opentelemetry/injector/schedule-injector.js";
import {PipeInjector}                     from "../../opentelemetry/injector/pipe-injector.js";
import {OpenTelemetryModuleDefaultConfig} from "../../opentelemetry/config/opentelemetry-module-default-config.js"
import {LoggerInjector}                   from "../../opentelemetry/injector/logger-injector.js";
import {GraphQLResolverInjector}          from "../../opentelemetry/injector/graphql-resolver-injector.js";



@Module({
	imports: [
		SentryModule.forRoot({
			dsn                : env.SENTRY_DSN,
			autoSessionTracking: true,
			tracesSampleRate   : 1.0,
			enableTracing      : true,
			enabled            : true,
			instrumenter       : "sentry",
		}),
		OpenTelemetryModule.forRoot({
			traceAutoInjectors : [
				ControllerInjector,
				GuardInjector,
				EventEmitterInjector,
				ScheduleInjector,
				PipeInjector,
				LoggerInjector,
				GraphQLResolverInjector,
			],
			autoDetectResources: true,
			instrumentations   : [...OpenTelemetryModuleDefaultConfig.instrumentations as any],
		}),
	],
	exports: [],
})
export class TelemetryModule {
}

