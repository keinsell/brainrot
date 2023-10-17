import {bootstrap}                     from "./bootstrap.js"
import {
	experimentalOpenTelemetryTracker,
}                                      from "./infrastructure/telemetry/agents/otel-experiemental-agent/otel-experimental-agent.js"
import {prettyPrintServiceInformation} from "./utilities/candies/service-information.js"
import {printSystemInfo}               from "./utilities/candies/system-information.js"

//otelAgent()
experimentalOpenTelemetryTracker()

printSystemInfo()
prettyPrintServiceInformation()

await bootstrap();

