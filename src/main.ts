import "reflect-metadata";
import "./infrastructure/telemetry/tracers/node-tracer.ts";
import { bootstrap } from "./index.ts";
import { otelSDK } from "./infrastructure/telemetry/telemetry.ts";

const USE_TELEMETRY = process.env["ENABLE_TELEMETRY"] !== "false";

if (USE_TELEMETRY) {
  otelSDK.start();
}

await bootstrap();
