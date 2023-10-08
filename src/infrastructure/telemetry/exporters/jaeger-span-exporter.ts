import {JaegerExporter} from "@opentelemetry/exporter-jaeger"

export const JaegerSpanExporter = new JaegerExporter({
	endpoint: 'http://localhost:14268/api/traces',
});