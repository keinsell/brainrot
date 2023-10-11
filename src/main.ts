import dotenv                from "dotenv";
import figlet                from "figlet"
import "reflect-metadata";
import signale               from "signale"
import {bootstrap}           from "./boostrap.ts";
import {otelSDK}             from "./infrastructure/telemetry/telemetry.ts";
import "./infrastructure/telemetry/tracers/basic-tracer-provider.ts";
import {basicTracerProvider} from "./infrastructure/telemetry/tracers/basic-tracer-provider.ts"
import {SystemInformation}   from "./utilities/system-information.js"

dotenv.config();

new SystemInformation().printSystemInfo();

console.log(figlet.textSync("Shabu-server", "Doom"))
console.log("Shabu is a boilerplate for Nest.js applications with batteries included.\n")


const USE_TELEMETRY = true;

if (USE_TELEMETRY) {
	otelSDK.start();
	basicTracerProvider();
	signale.success("Telemetry started \n");
}
else {
	signale.info("Telemetry is disabled. No data is being collected.\n");
	signale.info("To enable telemetry, set USE_TELEMETRY to true in your configuration.\n");
}

if (USE_TELEMETRY) {
	// Log a message about how to disable telemetry
	signale.info(
		"To disable telemetry and prevent data collection, you can set COLLECT_TELEMETRY=false in your configuration.\n",
	);
	signale.info("Example: COLLECT_TELEMETRY=false node your-server.js\n");
}


await bootstrap();
