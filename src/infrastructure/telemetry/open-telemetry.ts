import {Logger}                     from "@nestjs/common"
import {ExpressInstrumentation}     from "@opentelemetry/instrumentation-express"
import {GraphQLInstrumentation}     from "@opentelemetry/instrumentation-graphql"
import {GrpcInstrumentation}        from "@opentelemetry/instrumentation-grpc"
import {IORedisInstrumentation}     from "@opentelemetry/instrumentation-ioredis"
import {NestInstrumentation}        from "@opentelemetry/instrumentation-nestjs-core"
import {NetInstrumentation}         from "@opentelemetry/instrumentation-net"
import {RedisInstrumentation}       from "@opentelemetry/instrumentation-redis"
import {Resource}                   from "@opentelemetry/resources"
import {NodeSDK}                    from '@opentelemetry/sdk-node';
import {SimpleSpanProcessor}        from '@opentelemetry/sdk-trace-base';
import {SemanticResourceAttributes} from "@opentelemetry/semantic-conventions"
import {PrismaInstrumentation}      from "@prisma/instrumentation"
import * as dotenv                  from 'dotenv';
import * as process                 from 'process';
import {JaegerSpanExporter}         from "./exporters/jaeger-span-exporter.ts"

const logger = new Logger("OpenTelemetry");

dotenv.config();

const isDevelopment = dotenv.config().parsed?.NODE_ENV === "development";

const OpenTelemetry = new NodeSDK({
	resource        : new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]         : `shabu`,
		[SemanticResourceAttributes.SERVICE_VERSION]      : `0.0.1`,
		[SemanticResourceAttributes.SERVICE_INSTANCE_ID]  : `shabu-${process.pid}`,
		[SemanticResourceAttributes.TELEMETRY_SDK_NAME]   : `opentelemetry`,
		[SemanticResourceAttributes.TELEMETRY_SDK_LANG]   : `nodejs`,
		[SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: `1.0.0`,
	}),
	spanProcessor   : new SimpleSpanProcessor(JaegerSpanExporter),
	instrumentations: [
		new ExpressInstrumentation(),
		//new HttpInstrumentation(),
		new NestInstrumentation(),
		new PrismaInstrumentation(),
		new RedisInstrumentation(),
		new NetInstrumentation(),
		new IORedisInstrumentation(),
		new GrpcInstrumentation(),
		new GraphQLInstrumentation(),
	],
	traceExporter   : JaegerSpanExporter,
});

try {
	OpenTelemetry.start();

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