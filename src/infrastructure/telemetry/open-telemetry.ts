import {Logger}                                                from "@nestjs/common"
import {JaegerExporter}                                        from "@opentelemetry/exporter-jaeger"
import {registerInstrumentations}                              from "@opentelemetry/instrumentation"
import {ExpressInstrumentation}                                from "@opentelemetry/instrumentation-express"
import {GraphQLInstrumentation}                                from "@opentelemetry/instrumentation-graphql"
import {GrpcInstrumentation}                                   from "@opentelemetry/instrumentation-grpc"
import {HttpInstrumentation}                                   from "@opentelemetry/instrumentation-http"
import {IORedisInstrumentation}                                from "@opentelemetry/instrumentation-ioredis"
import {NestInstrumentation}                                   from "@opentelemetry/instrumentation-nestjs-core"
import {NetInstrumentation}                                    from "@opentelemetry/instrumentation-net"
import {RedisInstrumentation}                                  from "@opentelemetry/instrumentation-redis"
import {InstrumentationOption}                                 from "@opentelemetry/instrumentation/build/esnext"
import {Resource}                                              from "@opentelemetry/resources"
import {NodeSDK}                                               from '@opentelemetry/sdk-node';
import {BatchSpanProcessor, SimpleSpanProcessor, SpanExporter} from '@opentelemetry/sdk-trace-base';
import {ConsoleSpanExporter, SpanProcessor}                    from "@opentelemetry/sdk-trace-base/build/esnext"
import {NodeTracerProvider}                                    from "@opentelemetry/sdk-trace-node"
import {SemanticResourceAttributes}                            from "@opentelemetry/semantic-conventions"
import {PrismaInstrumentation}                                 from "@prisma/instrumentation"
import * as dotenv                                             from 'dotenv';
import * as process                                            from 'process';

const logger = new Logger("OpenTelemetry");

dotenv.config();

const isDevelopment = dotenv.config().parsed.NODE_ENV === "development";

function getResource(): Resource {
	return new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: `shabu`,
	});
}

export function getSpanExporter(): SpanExporter {
	return isDevelopment ? new ConsoleSpanExporter() : new JaegerExporter({
		endpoint: 'http://localhost:14268/api/traces',
	});
}

export function getSpanProcessor(): SpanProcessor {
	return isDevelopment ? new SimpleSpanProcessor(getSpanExporter()) : new BatchSpanProcessor(getSpanExporter(), {
		maxQueueSize: 1000,
	});
}

export function getInstrumentationOptions(): InstrumentationOption[] {
	return [
		new ExpressInstrumentation(),
		new HttpInstrumentation(),
		new NestInstrumentation(),
		new PrismaInstrumentation(),
		new RedisInstrumentation(),
		new NetInstrumentation(),
		new IORedisInstrumentation(),
		new GrpcInstrumentation(),
		new GraphQLInstrumentation(),
	] as any;
}

const provider = new NodeTracerProvider();


const OpenTelemetry = new NodeSDK({
	resource        : new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: `shabu`,
	}),
	spanProcessor   : getSpanProcessor(),
	instrumentations: [
		...getInstrumentationOptions(),
	],
	traceExporter   : getSpanExporter(),
});

try {
	await OpenTelemetry.start();

	logger.log("Telemetry agent was successfully started.");

	provider.addSpanProcessor(new SimpleSpanProcessor(getSpanExporter()));
	provider.register();

	registerInstrumentations({
		instrumentations: [
			...getInstrumentationOptions(),
		],
	})

	logger.log("Telemetry instrumentations registered.");
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