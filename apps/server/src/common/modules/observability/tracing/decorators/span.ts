import {SetMetadata}                   from "@nestjs/common"
import {OPEN_TELEMETRY_TRACE_METADATA} from "../constrants/OPEN_TELEMETRY_TRACE_METADATA.js"



/**
 * A decorator to mark a method as a span
 * @param name The name of the span
 */
export const Span = (name?: string) => SetMetadata(OPEN_TELEMETRY_TRACE_METADATA, name);