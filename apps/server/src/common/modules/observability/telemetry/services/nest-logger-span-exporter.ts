import {Logger}       from "@nestjs/common"
import {ExportResult} from "@opentelemetry/core"
import {ReadableSpan} from "@opentelemetry/sdk-trace-base/build/src/export/ReadableSpan.js"
import {SpanExporter} from "../types/span-exporter.js"



export class NestLoggerSpanExporter
	implements SpanExporter {
	private logger = new Logger("otel")

	public export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
		for (const span of spans) {
			this.logger.verbose(`[${span.name}] ${JSON.stringify(span.spanContext())}`)
		}
	}

	public shutdown(): Promise<void> {
		return;
	}
}
