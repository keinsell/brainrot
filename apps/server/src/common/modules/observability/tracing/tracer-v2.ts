import {Injectable}        from "@nestjs/common"
import {Attributes, Span}  from "@opentelemetry/api"
import {startInactiveSpan} from "@sentry/opentelemetry"
import {Exception}         from "./exception.js"
import {SpanOptions}       from "./span-options.js"



export abstract class Tracer<SPAN = Span, SPAN_OPTIONS = SpanOptions> {
	abstract getCurrentSpan(): Span | undefined


	abstract startActiveSpan<T extends (...args: unknown[]) => unknown>(name: string, fn: T, options?: SPAN_OPTIONS): ReturnType<T>


	abstract startSpan(name: string, options?: SPAN_OPTIONS): SPAN


	abstract setSpan(span: Span): void


	abstract recordException(exception: Exception, attributes?: Attributes): void


	abstract captureException(): void
}


@Injectable()
export class NoopTracer extends Tracer {
	getCurrentSpan(): Span | undefined {
		return undefined
	}


	public captureException(): void {
	}


	public recordException(exception: Exception, attributes?: Attributes): void {
	}


	public setSpan(span: Span): void {}


	public startActiveSpan<T extends (...args: any[]) => any>(name: string, fn: T, options?: SpanOptions): ReturnType<T> {
		return fn()
	}


	public startSpan(name: string, options?: SpanOptions): Span {
		return startInactiveSpan({
			...options,
			name: `[NOOP] ${name}`,
		})
	}
}