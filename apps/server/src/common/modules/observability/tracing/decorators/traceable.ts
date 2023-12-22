import {SetMetadata}                   from "@nestjs/common"
import {OPEN_TELEMETRY_TRACE_METADATA} from "../constrants/OPEN_TELEMETRY_TRACE_METADATA.js"



/**
 * Decorator to mark all methods of a class as a traceable
 */
export const Traceable = (name?: string) => SetMetadata(OPEN_TELEMETRY_TRACE_METADATA, name);