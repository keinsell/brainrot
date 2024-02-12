import {Exception as OpenTelemetryException} from "@opentelemetry/api"
import {Exception as DomainException}        from "../../../libraries/error-registry/error.js"



export type Exception = DomainException | OpenTelemetryException