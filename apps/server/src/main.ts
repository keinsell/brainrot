import {bootstrap}                         from "./bootstrap.js"
import {env}                               from "./configs/env.js";
import {experimentalOpenTelemetryTracker} from "./infrastructure/telemetry/agents/otel-experiemental-agent/otel-experimental-agent.js"
import {prettyPrintServiceInformation}    from "./utilities/console-utils/service-information.js"
import {printSystemInfo}                   from "./utilities/console-utils/system-information.js"



if (env.TRACING || true) {
	experimentalOpenTelemetryTracker()
}

printSystemInfo()
prettyPrintServiceInformation()

await bootstrap();

