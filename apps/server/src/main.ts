import {bootstrap}                                      from "./bootstrap.js"
import {experimentalOpenTelemetryTracker}               from "./common/modules/observability/telemetry/agents/opentelemetry-sdk.js"
import {env}                                            from "./configs/env.js";
import {prettyPrintServiceInformation, printSystemInfo} from "./utilities/console-utils/index.js"



experimentalOpenTelemetryTracker()

if (env.isProduction) {
	printSystemInfo()
}

prettyPrintServiceInformation()

await bootstrap();