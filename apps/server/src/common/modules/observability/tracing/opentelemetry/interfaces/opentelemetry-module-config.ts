import { Provider }               from '@nestjs/common'
import { NodeSDKConfiguration }   from '@opentelemetry/sdk-node'
import { AutomaticTraceInjector } from '../contract/automatic-trace-injector.js'



export interface OpenTelemetryModuleConfig
  extends Partial<NodeSDKConfiguration>
  {
	 traceAutoInjectors? : Provider<AutomaticTraceInjector>[];
  }