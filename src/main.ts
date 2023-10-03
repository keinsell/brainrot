import {bootstrap} from "./index.ts";

const USE_TELEMETRY = true;

if (USE_TELEMETRY) {
	await import("./infrastructure/telemetry/open-telemetry.ts")
}

await bootstrap();
