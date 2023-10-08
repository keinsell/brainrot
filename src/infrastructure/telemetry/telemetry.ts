import {Logger}                      from "@nestjs/common"
import {getNodeAutoInstrumentations} from "@opentelemetry/auto-instrumentations-node"
import {NestInstrumentation}         from "@opentelemetry/instrumentation-nestjs-core"
import {Resource}                    from "@opentelemetry/resources"
import {NodeSDK}                     from '@opentelemetry/sdk-node';
import {SimpleSpanProcessor}         from '@opentelemetry/sdk-trace-base';
import {SemanticResourceAttributes}  from "@opentelemetry/semantic-conventions"
import * as dotenv                   from 'dotenv';
import * as process                  from 'process';
import {JaegerSpanExporter}          from "./exporters/jaeger-span-exporter.ts"

const logger = new Logger("OpenTelemetry");

dotenv.config();

const isDevelopment = dotenv.config().parsed?.NODE_ENV === "development";

const telemetrySdk = new NodeSDK({
	resource        : new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: `shabu`,
	}),
	instrumentations: [...getNodeAutoInstrumentations() as any, new NestInstrumentation()],
	spanProcessor   : new SimpleSpanProcessor(JaegerSpanExporter),
	traceExporter   : JaegerSpanExporter,
});

export {telemetrySdk}

process.on('SIGTERM', () => {
	telemetrySdk
		.shutdown()
		.then(
			() => console.log('SDK shut down successfully'),
			(err) => console.log('Error shutting down SDK', err),
		)
		.finally(() => process.exit(0));
});