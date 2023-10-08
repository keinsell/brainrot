import {Module}              from "@nestjs/common"
import {OpenTelemetryModule} from "nestjs-otel"

@Module({
	imports: [
		OpenTelemetryModule.forRoot({
			metrics: {
				hostMetrics: true,
				apiMetrics : {
					enable               : true,
					defaultAttributes    : {
						custom: 'label',
					},
					ignoreRoutes         : ['/favicon.ico'],
					ignoreUndefinedRoutes: false,
				},
			},
		}),
	],
	exports: [],
})
export class TelemetryModule {}