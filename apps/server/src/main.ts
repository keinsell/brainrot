import {bootstrap}                                      from "./bootstrap.js"
import {prettyPrintServiceInformation, printSystemInfo} from "./utilities/console-utils/index.js"
import {initializeSentry}                               from "./hooks/pre-start/initialize-sentry.js";
import {isProduction}                                   from "./configs/configuration-service.js";

// TODO: Add check for minimal requirements to run server
// TODO: Run warn if host machine is too small
// Min. RAM = 512MB
// Min. CPU = 1x
// Recommended OS: Linux

// experimentalOpenTelemetryTracker()
initializeSentry()

if (isProduction()) {
	printSystemInfo()
}

prettyPrintServiceInformation()

await bootstrap();