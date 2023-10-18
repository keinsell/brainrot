import {bootstrap}                         from "./bootstrap.ts"
import {env}                               from "./configs/env.ts";
import {experimentalOpenTelemetryTracker} from "./infrastructure/telemetry/agents/otel-experiemental-agent/otel-experimental-agent.ts"
import {prettyPrintServiceInformation}    from "./utilities/candies/service-information.ts"
import {printSystemInfo}                   from "./utilities/candies/system-information.ts"



if (env.TRACING || true) {
	experimentalOpenTelemetryTracker()
}

printSystemInfo()
prettyPrintServiceInformation()

await bootstrap();

