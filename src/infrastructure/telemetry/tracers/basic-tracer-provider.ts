import {registerInstrumentations}                  from "@opentelemetry/instrumentation";
import {ExpressInstrumentation}                    from "@opentelemetry/instrumentation-express";
import {HttpInstrumentation}                       from "@opentelemetry/instrumentation-http";
import {NestInstrumentation}                       from "@opentelemetry/instrumentation-nestjs-core";
import {Resource}                                  from "@opentelemetry/resources";
import {BasicTracerProvider, SimpleSpanProcessor} from "@opentelemetry/sdk-trace-base";
import {SemanticResourceAttributes}                from "@opentelemetry/semantic-conventions";
import {PrismaInstrumentation}                     from "@prisma/instrumentation";
import {JaegerSpanExporter}                        from "../exporters/jaeger-span-exporter";
// import { AsyncHooksContextManager } from "@opentelemetry/context-async-hooks";
// import * as api from "@opentelemetry/api";

export function basicTracerProvider() {
	// const contextManager = new AsyncHooksContextManager().enable();

	// api.context.setGlobalContextManager(contextManager);

	const nodeTracer = new BasicTracerProvider({
		resource: new Resource({
			[SemanticResourceAttributes.SERVICE_NAME]: `shabu`,
		}),
	});

	nodeTracer.addSpanProcessor(new SimpleSpanProcessor(JaegerSpanExporter));

	nodeTracer.register();

	registerInstrumentations({
		instrumentations: [
			new HttpInstrumentation({
				// requireParentforIncomingSpans: true,
				// requireParentforOutgoingSpans: true,
			}),
			new ExpressInstrumentation(),
			new NestInstrumentation() as any,
			new PrismaInstrumentation({middleware: true}) as any,
		],
		tracerProvider  : nodeTracer,
	});
}

basicTracerProvider();
