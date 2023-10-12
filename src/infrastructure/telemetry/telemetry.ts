import {JaegerExporter}             from "@opentelemetry/exporter-jaeger";
import {ExpressInstrumentation}     from "@opentelemetry/instrumentation-express"
import {HttpInstrumentation}        from "@opentelemetry/instrumentation-http"
import {NestInstrumentation}        from "@opentelemetry/instrumentation-nestjs-core"
import {B3Propagator}               from "@opentelemetry/propagator-b3";
import {Resource}                   from "@opentelemetry/resources";
import {api, NodeSDK}               from "@opentelemetry/sdk-node";
import {ConsoleSpanExporter}        from "@opentelemetry/sdk-trace-base";
import {SemanticResourceAttributes} from "@opentelemetry/semantic-conventions";
import {PrismaInstrumentation}      from "@prisma/instrumentation"
// Don't forget to import the dotenv package!
import * as process                 from "process";



const jaegerExporter = new JaegerExporter({
	                                          endpoint: "http://localhost:14268/api/traces",
                                          });

const oltpExporter = new ConsoleSpanExporter();

const traceExporter =
	      process.env.NODE_ENV === `development` ? jaegerExporter : oltpExporter;

// Set B3 Propagator
api.propagation.setGlobalPropagator(new B3Propagator());

export const otelSDK = new NodeSDK({
	                                   resource        : new Resource({
		                                                                  [SemanticResourceAttributes.SERVICE_NAME]: `shabu`,
	                                                                  }),
	                                   instrumentations: [
		                                   new HttpInstrumentation(),
		                                   new ExpressInstrumentation(),
		                                   new NestInstrumentation() as any,
		                                   new PrismaInstrumentation({middleware: true}) as any,
	                                   ],
                                   });

// gracefully shut down the SDK on process exit
// process.on("SIGTERM", () => {
//   otelSDK
//     .shutdown()
//     .then(
//       () => console.log("SDK shut down successfully"),
//       (err) => console.log("Error shutting down SDK", err)
//     )
//     .finally(() => process.exit(0));
// });
