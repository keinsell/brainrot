import {diag, DiagLogLevel}                                   from "@opentelemetry/api";
import {getNodeAutoInstrumentations}                          from "@opentelemetry/auto-instrumentations-node"
import {AsyncLocalStorageContextManager}                      from "@opentelemetry/context-async-hooks"
import {JaegerExporter}                                       from "@opentelemetry/exporter-jaeger"
import {envDetector, osDetector, processDetector, Resource}   from "@opentelemetry/resources"
import {ConsoleMetricExporter, PeriodicExportingMetricReader} from "@opentelemetry/sdk-metrics";
import {NodeSDK}                                              from "@opentelemetry/sdk-node"
import {SimpleSpanProcessor}                                  from "@opentelemetry/sdk-trace-node";
import {SemanticResourceAttributes}                           from "@opentelemetry/semantic-conventions"
import {PrismaInstrumentation}                                from "@prisma/instrumentation"
import process                                                from "node:process"
import signale                                                from "signale"
import {env}                                                  from "../../../../../configs/env.js"
import {NestjsDiagLogger}                                     from "../../opentelemtry/diag-logger/nestjs-diag-logger.js";



if (env.isDev && false) {
	diag.setLogger(new NestjsDiagLogger(), DiagLogLevel.DEBUG);
}

const jaegerExporter = new JaegerExporter({
	endpoint: "http://localhost:14268/api/traces",
});

export const OpenTelemetrySDK = new NodeSDK({
	resourceDetectors: [envDetector, processDetector, osDetector],
	resource:          new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: env.SERVICE_NAME as string,
	}),
	metricReader:      new PeriodicExportingMetricReader({
		exporter: new ConsoleMetricExporter(),
	}),
	instrumentations:  [
		getNodeAutoInstrumentations(), new PrismaInstrumentation() as any,
	],
	spanProcessor:     new SimpleSpanProcessor(jaegerExporter) as any,
	traceExporter:     jaegerExporter as any,
	contextManager:    new AsyncLocalStorageContextManager(),
});


export function experimentalOpenTelemetryTracker() {
	OpenTelemetrySDK.start();
}


process.on("SIGTERM", () => {
	OpenTelemetrySDK
	.shutdown()
	.then(() => signale.success("OpenTelemetry SDK has been shut successfully."), (err) => signale.error("Error shutting down SDK", err))
	.finally(() => process.exit(0));
});

