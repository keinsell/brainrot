import {getNodeAutoInstrumentations}              from "@opentelemetry/auto-instrumentations-node"
import {registerInstrumentations}                 from "@opentelemetry/instrumentation"
import {NestInstrumentation}                      from "@opentelemetry/instrumentation-nestjs-core"
import {Resource}                                 from "@opentelemetry/resources"
import {NodeSDK}                                  from '@opentelemetry/sdk-node';
import {ConsoleSpanExporter, SimpleSpanProcessor} from '@opentelemetry/sdk-trace-base';
import {NodeTracerProvider}                       from "@opentelemetry/sdk-trace-node"
import {SemanticResourceAttributes}               from "@opentelemetry/semantic-conventions"
import {PrismaInstrumentation}                    from "@prisma/instrumentation"
import * as process                               from 'process';

const traceExporter = new ConsoleSpanExporter();

const provider = new NodeTracerProvider();


export const OpenTelemetry = new NodeSDK({
	resource        : new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: `shabu`,
	}),
	spanProcessor   : new SimpleSpanProcessor(traceExporter),
	instrumentations: [
		getNodeAutoInstrumentations(),
		//new HttpInstrumentation(),
		//new ExpressInstrumentation(),
		//new NestInstrumentation(),
	],
	traceExporter   : traceExporter,
});

try {
	await OpenTelemetry.start()

	provider.register();

	registerInstrumentations({
		instrumentations: [new PrismaInstrumentation(), new NestInstrumentation()] as any,
	});

	console.log("Initialized")
}
catch (error) {
	console.error(error)
}


process.on('SIGTERM', () => {
	OpenTelemetry
		.shutdown()
		.then(
			() => console.log('SDK shut down successfully'),
			(err) => console.log('Error shutting down SDK', err),
		)
		.finally(() => process.exit(0));
});