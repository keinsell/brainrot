import {Global, Module} from "@nestjs/common"
import {Tracer}         from "./tracer.js"
import {NoopTracer}     from "./tracer/noop-tracer.js";



@Global() @Module({
	providers: [
		{
			provide:  Tracer,
			useClass: NoopTracer,
		},
	],
	exports:   [
		Tracer,
	],
})
export class TracingModule {
	// TODO: I think Instrumentation module should export tracer class
	// This will allow us to use tracers from instrumentation modules
	// and by this we would actually have a way to use different tracers
	// without limitations of providers.
}