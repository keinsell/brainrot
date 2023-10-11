import dotenv                from "dotenv";
import figlet                from "figlet"
import "reflect-metadata";
import signale               from "signale"
import {bootstrap}           from "./index.ts";
import {otelSDK}             from "./infrastructure/telemetry/telemetry.ts";
import "./infrastructure/telemetry/tracers/basic-tracer-provider.ts";
import {basicTracerProvider} from "./infrastructure/telemetry/tracers/basic-tracer-provider.ts"

dotenv.config();

console.log(figlet.textSync("Shabu-server", "Doom"))
console.log("Shabu is a boilerplate for Nest.js applications with batteries included.\n")

// TODO: Add OS Architecture
// TODO: Add OS Platform
// TODO: Add OS Release
// TODO: Add RAM
// TODO: Add CPU (cores@avgSpeed)
console.log("System Information:")
console.log(`\tNode.js Version: ${process.version}`)
console.log(`\tNode.js Platform: ${process.platform}`)
console.log(`\tNode.js Architecture: ${process.arch}`)

// TODO: Add check for minimal server requirements
// RAM > 256MB
// CPU > 1 core @ 1GHz
// Disk > 1GB
// Network > 1Mbps

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
