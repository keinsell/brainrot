import {
	ConsoleLoggerInjector,
	ControllerInjector,
	EventEmitterInjector,
	GraphQLResolverInjector,
	GuardInjector,
	OpenTelemetryModule,
	OpenTelemetryModuleDefaultConfig,
	PipeInjector,
	ScheduleInjector,
}               from "@amplication/opentelemetry-nestjs"
import {Module} from "@nestjs/common"



@Module({
	imports: [
		OpenTelemetryModule.forRoot({
			traceAutoInjectors:  [
				ControllerInjector, GuardInjector, EventEmitterInjector, ScheduleInjector, PipeInjector,
				ConsoleLoggerInjector, GraphQLResolverInjector,
			],
			autoDetectResources: true,
			instrumentations:    [...OpenTelemetryModuleDefaultConfig.instrumentations],
		}),
	],
	exports: [],
})
export class TelemetryModule {
}

