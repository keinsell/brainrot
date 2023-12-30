import {diag, DiagLogLevel}                                 from "@opentelemetry/api";
import {
	getNodeAutoInstrumentations,
}                                                           from "@opentelemetry/auto-instrumentations-node"
import {
	JaegerExporter,
}                                                           from "@opentelemetry/exporter-jaeger"
import {envDetector, osDetector, processDetector, Resource} from "@opentelemetry/resources"
import {
	AggregationTemporality,
	InMemoryMetricExporter,
	PeriodicExportingMetricReader,
}                                                           from "@opentelemetry/sdk-metrics";
import {NodeSDK}                                            from "@opentelemetry/sdk-node"
import {
	SemanticResourceAttributes,
}                                                           from "@opentelemetry/semantic-conventions"
import {PrismaInstrumentation}                              from "@prisma/instrumentation"
import process                                              from "node:process"
import signale                                              from "signale"
import {
	env,
}                                                           from "../../../../../configs/env.js"
import {
	NestjsDiagnosticLogger,
}                                                           from "../../../opentelemetry/service/nestjs-diagnostic-logger.js";



export function experimentalOpenTelemetryTracker() {
	if (env.isDev) {
		diag.setLogger(new NestjsDiagnosticLogger(), DiagLogLevel.DEBUG);
	}

	const jaegerExporter = new JaegerExporter({
		endpoint: "http://localhost:14268/api/traces",
	});

	// const client = getClient();
	// setupEventContextTrace(client as any);

	// const SentryContextManager = wrapContextManagerClass(AsyncLocalStorageContextManager);

	const OpenTelemetrySDK = new NodeSDK({
		resourceDetectors: [
			envDetector,
			processDetector,
			osDetector,
		],
		resource         : new Resource({
			[SemanticResourceAttributes.SERVICE_NAME]: env.SERVICE_NAME as string,
		}),
		metricReader     : new PeriodicExportingMetricReader({
			exporter: new InMemoryMetricExporter(AggregationTemporality.CUMULATIVE),
		}),
		instrumentations : [
			getNodeAutoInstrumentations(),
			new PrismaInstrumentation() as any,
		],
		traceExporter    : jaegerExporter as any,
		// spanProcessor    : new SentrySpanProcessor(),
		// textMapPropagator: new SentryPropagator(),
		// contextManager   : new SentryContextManager(),
		// sampler          : new SentrySampler(client as any),

	});

	// setOpenTelemetryContextAsyncContextStrategy();

	OpenTelemetrySDK.start();

	process.on("SIGTERM", () => {
		OpenTelemetrySDK
		.shutdown()
		.then(
			() => signale.success("OpenTelemetry SDK has been shut successfully."),
			(err) => signale.error("Error shutting down SDK", err),
		)
		.finally(() => process.exit(0));
	});
}






