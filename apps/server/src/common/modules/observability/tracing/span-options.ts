import {SpanOptions as OpenTelementrySpanOptions} from "@opentelemetry/api"
import {SpanAttribute}                            from "./span-attribute.js"



export type SpanOptions = OpenTelementrySpanOptions & { attributes: SpanAttribute }