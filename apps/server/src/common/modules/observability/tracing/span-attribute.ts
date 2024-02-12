import {Attributes} from "@opentelemetry/api"



export type SpanAttribute = Attributes & {
	/** Compatibility with Sentry */
	op?: ""
}