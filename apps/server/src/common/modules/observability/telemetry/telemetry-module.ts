import {Module}                           from "@nestjs/common"
import {OpenTelemetryModule}              from "../../opentelemetry/open-telemetry-module.js";
import {ControllerInjector}               from "../../opentelemetry/injector/controller-injector.js";
import {GuardInjector}                    from "../../opentelemetry/injector/guard-injector.js";
import {EventEmitterInjector}             from "../../opentelemetry/injector/event-emitter-injector.js";
import {ScheduleInjector}                 from "../../opentelemetry/injector/schedule-injector.js";
import {PipeInjector}                     from "../../opentelemetry/injector/pipe-injector.js";
import {OpenTelemetryModuleDefaultConfig} from "../../opentelemetry/config/opentelemetry-module-default-config.js"
import {LoggerInjector}                   from "../../opentelemetry/injector/logger-injector.js";
import {GraphQLResolverInjector}          from "../../opentelemetry/injector/graphql-resolver-injector.js";
import {SentryModule}                     from "../../sentry/sentry-module.js";
import {env}                              from "../../../../configs/env.js";
import Sentry                             from "@sentry/node";
import {ProfilingIntegration}             from "@sentry/profiling-node";



@Module({
	imports: [
		SentryModule.forRoot({
			dsn                : env.SENTRY_DSN,
			autoSessionTracking: true,
			tracesSampleRate   : 1.0,
			profilesSampleRate : 1.0,
			enableTracing      : true,
			sampleRate         : 1.0,
			enabled            : true,
			debug              : true,
			instrumenter       : "otel",
			integrations       : [
				new Sentry.Integrations.Console(),
				new Sentry.Integrations.Http({tracing: true, breadcrumbs: true}),
				new Sentry.Integrations.Context(),
				new Sentry.Integrations.Prisma(),
				new ProfilingIntegration(),
			],
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
			instrumentations   : [
				...OpenTelemetryModuleDefaultConfig.instrumentations ?? [],
			],
		}),
	],
	exports: [],
})
export class TelemetryModule {
}

