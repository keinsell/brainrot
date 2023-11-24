import {bootstrap}                                      from "./bootstrap.js"
import {experimentalOpenTelemetryTracker}               from "./common/infrastructure/observability/telemetry/agents/otel-experiemental-agent/otel-experimental-agent.js"
import {env}                                            from "./configs/env.js";
import {prettyPrintServiceInformation, printSystemInfo} from "./utilities/console-utils/index.js"



if (env.TRACING || true) {
	experimentalOpenTelemetryTracker()
}

if (env.isProduction) {
	printSystemInfo()
}

prettyPrintServiceInformation()

await bootstrap();

