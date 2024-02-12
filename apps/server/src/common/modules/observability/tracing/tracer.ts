import {Attributes, Span} from "@opentelemetry/api"
import {Exception}        from "./exception.js"
import {SpanOptions}      from "./span-options.js"



export abstract class Tracer<SPAN = Span, SPAN_OPTIONS = SpanOptions> {
	abstract getCurrentSpan(): Span | undefined


	abstract startActiveSpan<T extends (...args: unknown[]) => unknown>(name: string, fn: T, options?: SPAN_OPTIONS): ReturnType<T>


	abstract startSpan(name: string, options?: SPAN_OPTIONS): SPAN


	abstract setSpan(span: Span): void


	abstract recordException(exception: Exception, attributes?: Attributes): void
}


