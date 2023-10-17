import figlet                from "figlet"
import "reflect-metadata";
import signale               from "signale"
import {bootstrap}           from "./boostrap.ts";
import {env}                 from "./configs/env.js"
import {OpenTelemetrySDK}    from "./infrastructure/telemetry/telemetry.js"
import {basicTracerProvider} from "./infrastructure/telemetry/tracers/basic-tracer-provider.js"
import "./infrastructure/telemetry/tracers/basic-tracer-provider.ts";
import {SystemInformation}   from "./utilities/system-information.ts"



new SystemInformation().printSystemInfo();

console.log(figlet.textSync(env.SERVICE_NAME as string, "Doom"))
console.log(env.SERVICE_DESCRIPTION + "\n")

if (env.TRACING) {
	try {
		basicTracerProvider();
		OpenTelemetrySDK.start();
	} catch (e) {
		signale.error("Error while starting telemetry: " + e)
	}

	signale.success("Telemetry enabled. To turn off telemetry and prevent data collection." +
	                "Set TRACING=false in your configuration.\n");
} else {
	signale.warn("Telemetry has stopped. To enable it, set the `TRACING` variable to true in." +
	             " environment configuration. This can help in identifying and resolving possible issues with your" +
	             " software." +
	             " \n")
}

await bootstrap();
