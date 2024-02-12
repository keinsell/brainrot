import {Span as OpenTelemetrySpan} from "@opentelemetry/sdk-trace-base"
import {SpanAttribute}             from "./span-attribute.js"



export type Span = OpenTelemetrySpan & { attributes: SpanAttribute }