import dotenv                from "dotenv";
import "reflect-metadata";
import {bootstrap}           from "./index.ts";
import {otelSDK}             from "./infrastructure/telemetry/telemetry.ts";
import "./infrastructure/telemetry/tracers/basic-tracer-provider.ts";
import {basicTracerProvider} from "./infrastructure/telemetry/tracers/basic-tracer-provider.ts"

dotenv.config();

const USE_TELEMETRY = true;

if (USE_TELEMETRY) {
	otelSDK.start();
	basicTracerProvider()
}

console.log(process.env.DATABASE_URI)

await bootstrap();
