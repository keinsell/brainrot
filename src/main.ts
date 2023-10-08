import {bootstrap}    from "./index.ts";
import {telemetrySdk} from "./infrastructure/telemetry/telemetry.ts"

const USE_TELEMETRY =
	      process.env["ENABLE_TELEMETRY"] !== "false";

if (USE_TELEMETRY) {
	telemetrySdk.start()
}

await bootstrap();
