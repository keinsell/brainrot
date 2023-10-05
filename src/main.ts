import { bootstrap } from "./index.ts";

const USE_TELEMETRY =
  process.env["ENABLE_TELEMETRY"] === "false" ? false : true;

if (USE_TELEMETRY) {
  await import("./infrastructure/telemetry/open-telemetry.ts");
}

await bootstrap();
