import dotenv                from "dotenv";
import figlet                from "figlet"
import "reflect-metadata";
import signale               from "signale"
import {bootstrap}           from "./boostrap.ts";
import {otelSDK}             from "./infrastructure/telemetry/telemetry.ts";
import "./infrastructure/telemetry/tracers/basic-tracer-provider.ts";
import {basicTracerProvider} from "./infrastructure/telemetry/tracers/basic-tracer-provider.ts"
import {SystemInformation}   from "./utilities/system-information.ts"



dotenv.config();

const SERVICE_NAME = process.env.SERVICE_NAME ?? "example-service";
const SERVICE_DESCRIPTION = process.env.SERVICE_DESCRIPTION ?? "Example service is a boilerplate for Nest.js" +
                            " applications" +
                            " with batteries included.";

new SystemInformation().printSystemInfo();

console.log(figlet.textSync(SERVICE_NAME, "Doom"))
console.log(SERVICE_DESCRIPTION + "\n")

const USE_TELEMETRY = false;

if (USE_TELEMETRY) {
	try {
		otelSDK.start();
		basicTracerProvider();
	} catch (e) {
		signale.error("Error while starting telemetry: " + e)
	}

	signale.warn("Telemetry enabled. To turn off telemetry and prevent data collection." +
	             "Set COLLECT_TELEMETRY=false in your configuration.\n");
} else {
	signale.warn("Telemetry has stopped. To enable it, set the `COLLECT_TELEMETRY` variable to true in." +
	             " environment configuration. This can help in identifying and resolving possible issues with your" +
	             " software." +
	             " \n")
}

await bootstrap();
