import {Logger}       from "@nestjs/common"
import {ExportResult} from "@opentelemetry/core"
import {ReadableSpan} from "@opentelemetry/sdk-trace-base/build/src/export/ReadableSpan.ts"



interface SpanExporter {
	/**
	 * Called to export sampled {@link ReadableSpan}s.
	 * @param spans the list of sampled Spans to be exported.
	 */
	export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void;

	/** Stops the exporter. */
	shutdown(): Promise<void>;

	/** Immediately export all spans */
	forceFlush?(): Promise<void>;
}


export class NestLoggerSpanExporter implements SpanExporter {
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
