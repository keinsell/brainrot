import {Logger}                                  from "@nestjs/common"
import {getNodeAutoInstrumentations}             from "@opentelemetry/auto-instrumentations-node"
import {JaegerExporter}                          from "@opentelemetry/exporter-jaeger"
import {registerInstrumentations}                from "@opentelemetry/instrumentation"
import {NestInstrumentation}                     from "@opentelemetry/instrumentation-nestjs-core"
import {Resource}                                from "@opentelemetry/resources"
import {NodeSDK}                                 from '@opentelemetry/sdk-node';
import {BatchSpanProcessor, SimpleSpanProcessor} from '@opentelemetry/sdk-trace-base';
import {ConsoleSpanExporter}                     from "@opentelemetry/sdk-trace-base/build/esnext"
import {NodeTracerProvider}                      from "@opentelemetry/sdk-trace-node"
import {SemanticResourceAttributes}              from "@opentelemetry/semantic-conventions"
import {PrismaInstrumentation}                   from "@prisma/instrumentation"
import * as dotenv                               from 'dotenv';
import * as process                              from 'process';

const logger = new Logger("OpenTelemetry");

dotenv.config();

const isDevelopment = dotenv.config().parsed.NODE_ENV === "development";

const provider = new NodeTracerProvider();

console.log("isDevelopment: ", isDevelopment);

const jaegerExporter = new JaegerExporter({
	endpoint: 'http://localhost:14268/api/traces',
});

const traceExporter = isDevelopment ? new ConsoleSpanExporter() : jaegerExporter;

// Registering provider early
provider.register();

registerInstrumentations({
	instrumentations: [
		new NestInstrumentation(),
		new PrismaInstrumentation(),
	],
})

const OpenTelemetry = new NodeSDK({
	resource        : new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: `shabu`,
	}),
	spanProcessor   : isDevelopment ?
		new SimpleSpanProcessor(traceExporter) :
		new BatchSpanProcessor(traceExporter, {
			maxQueueSize: 1000,
		}),
	instrumentations: [
		getNodeAutoInstrumentations(),
		new NestInstrumentation(),
	],
	traceExporter   : traceExporter,
});

try {
	await OpenTelemetry.start();
	logger.log("Telemetry agent was successfully started.");
}
catch (error) {
	logger.error("Telemetry agent encountered error: ", error);
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