import {bootstrap}                                      from "./bootstrap.js"
import {prettyPrintServiceInformation, printSystemInfo} from "./utilities/console-utils/index.js"
import {initializeSentry}                               from "./hooks/pre-start/initialize-sentry.js";

import {isProduction} from "./configs/helper/is-production.js";

// TODO: Add check for minimal requirements to run server
// TODO: Run warn if host machine is too small
// Min. RAM = 512MB
// Min. CPU = 1x
// Recommended OS: Linux

// experimentalOpenTelemetryTracker()

if (isProduction()) {
	printSystemInfo()
}

prettyPrintServiceInformation()

initializeSentry()

await bootstrap();