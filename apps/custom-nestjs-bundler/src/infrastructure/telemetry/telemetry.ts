import {AsyncLocalStorageContextManager}          from "@opentelemetry/context-async-hooks"
import {JaegerExporter}                           from "@opentelemetry/exporter-jaeger";
import {B3Propagator}                             from "@opentelemetry/propagator-b3";
import {Resource}                                 from "@opentelemetry/resources";
import {api, NodeSDK}                             from "@opentelemetry/sdk-node";
import {ConsoleSpanExporter, SimpleSpanProcessor} from "@opentelemetry/sdk-trace-base";
import {SemanticResourceAttributes}               from "@opentelemetry/semantic-conventions";
// Don't forget to import the dotenv package!
import process                                    from "node:process";
import signale                                    from "signale"
import {env}                                      from "../../configs/env.js"



const jaegerExporter = new JaegerExporter({
	                                          endpoint: "http://localhost:14268/api/traces",
                                          });

const oltpExporter = new ConsoleSpanExporter();

const traceExporter =
	      process.env.NODE_ENV === `development` ? jaegerExporter : oltpExporter;

// Set B3 Propagator
api.propagation.setGlobalPropagator(new B3Propagator());

export const OpenTelemetrySDK = new NodeSDK({
	                                            resource         : new Resource({
		                                                                            [SemanticResourceAttributes.SERVICE_NAME]: env.SERVICE_NAME as string,
	                                                                            }),
	                                            instrumentations : [
		                                            //getNodeAutoInstrumentations(),
	                                            ],
	                                            spanProcessor    : new SimpleSpanProcessor(jaegerExporter),
	                                            textMapPropagator: B3Propagator,
	                                            traceExporter    : jaegerExporter,
	                                            contextManager   : new AsyncLocalStorageContextManager(),
                                            });

process.on("SIGTERM", () => {
	OpenTelemetrySDK
	.shutdown()
	.then(
		() => signale.success("OpenTelemetry SDK has been shut successfully."),
		(err) => signale.error("Error shutting down SDK", err),
	)
	.finally(() => process.exit(0));
});
