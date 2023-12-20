import {ModuleMetadata}            from "@nestjs/common/interfaces"
import {OpenTelemetryModuleConfig} from "./opentelemetry-module-config.js"



export interface OpentelemetryModuleAsyncOptions
	extends Pick<ModuleMetadata, 'imports'> {
	useFactory?: (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		...args: any[]
	) =>
		| Promise<Partial<OpenTelemetryModuleConfig>>
		| Partial<OpenTelemetryModuleConfig>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inject?: any[];
}