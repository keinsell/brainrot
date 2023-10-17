import {getNodeAutoInstrumentations} from "@opentelemetry/auto-instrumentations-node"
import {AsyncHooksContextManager}    from "@opentelemetry/context-async-hooks"
import {JaegerExporter}              from "@opentelemetry/exporter-jaeger"
import {Resource}                    from "@opentelemetry/resources"
import {NodeSDK}                     from "@opentelemetry/sdk-node"
import {SimpleSpanProcessor}         from "@opentelemetry/sdk-trace-node"
import {SemanticResourceAttributes}  from "@opentelemetry/semantic-conventions"
import {PrismaInstrumentation}       from "@prisma/instrumentation"
import process                       from "node:process"
import signale                       from "signale"
import {env}                         from "../../../../configs/env.js"
import {NestLoggerSpanExporter}     from "../../opentelemtry/exporters/nest-logger-span-exporter.js"



const jaegerExporter = new JaegerExporter({
	                                          endpoint: "http://localhost:14268/api/traces",
                                          });

//const oltpExporter = new ConsoleSpanExporter();

const traceExporter = new NestLoggerSpanExporter()

export const OpenTelemetrySDK = new NodeSDK({
	                                            resource        : new Resource({
		                                                                           [SemanticResourceAttributes.SERVICE_NAME]: env.SERVICE_NAME as string,
	                                                                           }),
	                                            instrumentations: [
		                                            getNodeAutoInstrumentations(),
		                                            new PrismaInstrumentation() as any,
	                                            ],
	                                            spanProcessor   : new SimpleSpanProcessor(traceExporter),
	                                            traceExporter   : traceExporter,
	                                            contextManager  : new AsyncHooksContextManager(),
                                            });

export function experimentalOpenTelemetryTracker() {
	OpenTelemetrySDK.start();
}

process.on("SIGTERM", () => {
	OpenTelemetrySDK
	.shutdown()
	.then(
		() => signale.success("OpenTelemetry SDK has been shut successfully."),
		(err) => signale.error("Error shutting down SDK", err),
	)
	.finally(() => process.exit(0));
});
