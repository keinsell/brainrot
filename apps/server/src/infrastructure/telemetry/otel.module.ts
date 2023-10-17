import {
	ConsoleLoggerInjector,
	ControllerInjector,
	EventEmitterInjector,
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
				ConsoleLoggerInjector,
			],
			autoDetectResources: true,
			instrumentations:    [...OpenTelemetryModuleDefaultConfig.instrumentations],
		}),
	],
	exports: [],
})
export class TelemetryModule {
}

