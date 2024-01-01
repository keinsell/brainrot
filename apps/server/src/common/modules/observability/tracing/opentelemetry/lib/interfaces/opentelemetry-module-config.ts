import {Provider}             from "@nestjs/common"
import {NodeSDKConfiguration} from "@opentelemetry/sdk-node"
import {AutoTraceInjector}    from "../injector/auto-trace-injector.js";



export interface OpenTelemetryModuleConfig
	extends Partial<NodeSDKConfiguration> {
	traceAutoInjectors? : Provider<AutoTraceInjector>[];
}