import bytes                 from "bytes"
import dotenv                from "dotenv";
import figlet                from "figlet"
import * as os               from "os"
import "reflect-metadata";
import signale               from "signale"
import {bootstrap}           from "./boostrap.ts";
import {otelSDK}             from "./infrastructure/telemetry/telemetry.ts";
import "./infrastructure/telemetry/tracers/basic-tracer-provider.ts";
import {basicTracerProvider} from "./infrastructure/telemetry/tracers/basic-tracer-provider.ts"

dotenv.config();

console.log(`Node.js Version: ${process.version}`)
console.log(`Node.js Platform: ${process.platform}`)
console.log(`Node.js Architecture: ${process.arch}`)
console.log(`Node.js Heap: ${bytes(process.memoryUsage().heapUsed)} / ${bytes(process.memoryUsage().heapTotal)}\n`)

console.log(`Environment: ${process.env.NODE_ENV ?? "development"}`)
console.log(`Host: ${process.env.HOST ?? "localhost"}`)
console.log(`Port: ${process.env.PORT ?? 3000}`)
console.log(`Protocol: ${process.env.PROTOCOL ?? "http"}\n`)

console.log(`OS: ${os.userInfo()} ${process.platform} ${process.arch}`)
const avgCpuSpeedInGhz = (
	os.cpus().reduce((acc, cpu) => acc + cpu.speed, 0) / os.cpus().length / 1000
).toFixed(2)
console.log(`CPU: ${os.cpus()[0].model} @ ${avgCpuSpeedInGhz} Ghz`)
console.log(`RAM: ${bytes(os.totalmem())} (${bytes(os.freemem())} free)`)

console.log(figlet.textSync("Shabu-server", "Doom"))
console.log("Shabu is a boilerplate for Nest.js applications with batteries included.\n")


// TODO: Add OS Architecture
// TODO: Add OS Platform
// TODO: Add OS Release
// TODO: Add RAM
// TODO: Add CPU (cores@avgSpeed)

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
