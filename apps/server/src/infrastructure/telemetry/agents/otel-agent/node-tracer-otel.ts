import {getNodeAutoInstrumentations}             from "@opentelemetry/auto-instrumentations-node"
import {AsyncLocalStorageContextManager}         from "@opentelemetry/context-async-hooks"
import {registerInstrumentations}                from "@opentelemetry/instrumentation"
import {Resource}                                from "@opentelemetry/resources"
import {api}                                     from "@opentelemetry/sdk-node"
import {NodeTracerProvider, SimpleSpanProcessor} from "@opentelemetry/sdk-trace-node"
import {SemanticResourceAttributes}              from "@opentelemetry/semantic-conventions"
import {PrismaInstrumentation}                   from "@prisma/instrumentation"
import {env}                                     from "../../../../configs/env.js"
import {NestLoggerSpanExporter}                  from "../../opentelemtry/exporters/nest-logger-span-exporter.js"



export function nodeTracerOtel() {
	const contextManager = new AsyncLocalStorageContextManager().enable();
	api.context.setGlobalContextManager(contextManager);

	const exporter = new NestLoggerSpanExporter()

	const nodeTracer = new NodeTracerProvider({
		                                          resource: new Resource({
			                                                                 [SemanticResourceAttributes.SERVICE_NAME]:
				                                                                 env.SERVICE_NAME as string,
		                                                                 }),
	                                          });
	nodeTracer.addSpanProcessor(new SimpleSpanProcessor(exporter));
	nodeTracer.register();
	registerInstrumentations({
		                         instrumentations: [
			                         getNodeAutoInstrumentations(),
			                         new PrismaInstrumentation({middleware: true}) as any,
		                         ],
		                         tracerProvider  : nodeTracer,
	                         });
}