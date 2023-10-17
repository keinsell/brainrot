import {AsyncLocalStorageContextManager}          from "@opentelemetry/context-async-hooks"
import {registerInstrumentations}                 from "@opentelemetry/instrumentation"
import {Resource}                                 from "@opentelemetry/resources"
import {api}                                      from "@opentelemetry/sdk-node"
import {ConsoleSpanExporter, SimpleSpanProcessor} from "@opentelemetry/sdk-trace-base"
import {NodeTracerProvider}                       from "@opentelemetry/sdk-trace-node"
import {SemanticResourceAttributes}               from "@opentelemetry/semantic-conventions"
import {PrismaInstrumentation}                    from "@prisma/instrumentation"
import {env}                                      from "../../../configs/env.js"



export function basicTracerProvider() {
	const contextManager = new AsyncLocalStorageContextManager().enable();
	api.context.setGlobalContextManager(contextManager);

	const nodeTracer = new NodeTracerProvider({
		                                          resource: new Resource({
			                                                                 [SemanticResourceAttributes.SERVICE_NAME]:
				                                                                 env.SERVICE_NAME as string,
		                                                                 }),
	                                          });
	nodeTracer.addSpanProcessor(new SimpleSpanProcessor(ConsoleSpanExporter));
	nodeTracer.register();
	registerInstrumentations({
		                         instrumentations : [
			                         new PrismaInstrumentation({middleware: true}) as
				                         any,
		                         ], tracerProvider: nodeTracer,
	                         });
}

