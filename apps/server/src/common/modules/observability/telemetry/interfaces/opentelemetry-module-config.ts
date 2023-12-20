import {Provider}             from "@nestjs/common"
import {Injector}             from "@nestjs/core/injector/injector.js"
import {NodeSDKConfiguration} from "@opentelemetry/sdk-node"



export interface OpenTelemetryModuleConfig
	extends Partial<NodeSDKConfiguration> {
	traceAutoInjectors?: Provider<Injector>[];
}