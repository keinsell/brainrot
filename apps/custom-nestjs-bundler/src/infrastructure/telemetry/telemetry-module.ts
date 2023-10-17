import {Module}              from "@nestjs/common"
import {OpenTelemetryModule} from "nestjs-otel"
import {env}                 from "../../configs/env.js"



const imports = []

if (env.TRACING) {
	imports.push(OpenTelemetryModule.forRoot({
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
	                                         }))
}


@Module({
	        imports: imports,
	        exports: [],
        })
export class TelemetryModule {}