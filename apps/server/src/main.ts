import {bootstrap}                                      from "./bootstrap.js"
import {experimentalOpenTelemetryTracker}               from "./common/modules/observability/telemetry/agents/opentelemetry-sdk.js"
import {env}                                            from "./configs/env.js";
import {prettyPrintServiceInformation, printSystemInfo} from "./utilities/console-utils/index.js"

// TODO: Add check for minimal requirements to run server
// TODO: Run warn if host machine is too small
// Min. RAM = 512MB
// Min. CPU = 1x
// Recommended OS: Linux

experimentalOpenTelemetryTracker()

if (env.isProduction) {
	printSystemInfo()
}

prettyPrintServiceInformation()

await bootstrap();