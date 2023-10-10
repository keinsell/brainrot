import "reflect-metadata";
import {bootstrap} from "./index.ts";
import {otelSDK}   from "./infrastructure/telemetry/telemetry.ts";
import "./infrastructure/telemetry/tracers/basic-tracer-provider.ts";

const USE_TELEMETRY = process.env["ENABLE_TELEMETRY"] !== "false";

if (USE_TELEMETRY) {
	otelSDK.start();
}

await bootstrap();
