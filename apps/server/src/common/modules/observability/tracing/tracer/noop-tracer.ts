import {Injectable, Logger} from "@nestjs/common";
import {Attributes, Span}   from "@opentelemetry/api";
import {startInactiveSpan}  from "@sentry/opentelemetry";
import {Exception}          from "../exception.js";
import {SpanOptions}        from "../span-options.js";
import {Tracer}             from "../tracer.js";



@Injectable()
export class NoopTracer extends Tracer {
	getCurrentSpan(): Span | undefined {
		return undefined
	}


	public captureException(): void {
	}


	public recordException(exception: Exception, attributes?: Attributes): void {
		new Logger().verbose(`WARNING: Using noop tracer. Exception will not be recorded.`)
	}


	public setSpan(span: Span): void {}


	public startActiveSpan<T extends (...args: any[]) => any>(name: string, fn: T, options?: SpanOptions): ReturnType<T> {
		new Logger().verbose(`WARNING: Using noop tracer. Active span "${name}" will not be recorded.`)
		return fn()
	}


	public startSpan(name: string, options?: SpanOptions): Span {
		const span = startInactiveSpan({
			...options,
			name: `${name}`,
		})

		new Logger().verbose(`WARNING: Using noop tracer. Span "${name}" will not be recorded.`)

		return span
	}
}