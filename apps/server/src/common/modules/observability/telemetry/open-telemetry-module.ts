//import {
//	OpenTelemetryModuleAsyncOption, OpenTelemetryModuleDefaultConfig, TraceService,
//}                                       from "@amplication/opentelemetry-nestjs"
//import {DecoratorInjector}              from "@amplication/opentelemetry-nestjs/dist/Trace/Injectors/DecoratorInjector.js"
//import {DynamicModule, FactoryProvider} from "@nestjs/common"
//import {ModuleRef}                      from "@nestjs/core"
//import {EventEmitterModule}             from "@nestjs/event-emitter"
//import {NodeSDK}                        from "@opentelemetry/sdk-node"
//import {OPEN_TELEMETRY_SDK}             from "./constants/OPEN_TELEMETRY_SDK.js"
//import {OPEN_TELEMETRY_SDK_CONFIG}      from "./constants/OPEN_TELEMETRY_SDK_CONFIG.js"
//import {OPEN_TELEMETRY_SDK_INJECTORS}   from "./constants/OPEN_TELEMETRY_SDK_INJECTORS.js"
//import {OpenTelemetryModuleConfig}      from "./interfaces/opentelemetry-module-config.js"
//import {OpenTelemetryService}           from "./services/open-telemetry-service.js"
//
//
//
//export class OpenTelemetryModule {
//	static async forRoot(
//		configuration: Partial<OpenTelemetryModuleConfig> = {},
//	): Promise<DynamicModule> {
//		configuration = { ...OpenTelemetryModuleDefaultConfig, ...configuration };
//		const injectors = configuration?.traceAutoInjectors ?? [];
//		return {
//			global: true,
//			module: OpenTelemetryModule,
//			imports: [EventEmitterModule.forRoot()],
//			providers: [
//				...injectors,
//				TraceService,
//				OpenTelemetryService,
//				DecoratorInjector,
//				this.buildProvider(configuration),
//				this.buildInjectors(configuration),
//				this.buildTracer(),
//				{
//					provide: OPEN_TELEMETRY_SDK_CONFIG,
//					useValue: configuration,
//				},
//			],
//			exports: [TraceService, Tracer],
//		};
//	}
//
//
//	static async forRootAsync(
//		configuration: OpenTelemetryModuleAsyncOption = {},
//	): Promise<DynamicModule> {
//		return {
//			global: true,
//			module: OpenTelemetryModule,
//			// eslint-disable-next-line no-unsafe-optional-chaining
//			imports: [...configuration?.imports, EventEmitterModule.forRoot()],
//			providers: [
//				TraceService,
//				OpenTelemetryService,
//				this.buildAsyncProvider(),
//				this.buildAsyncInjectors(),
//				this.buildTracer(),
//				{
//					provide: OPEN_TELEMETRY_SDK_CONFIG,
//					useFactory: configuration.useFactory,
//					inject: configuration.inject,
//				},
//			],
//			exports: [TraceService, Tracer],
//		};
//	}
//
//
//	private static buildProvider(
//		configuration?: Partial<OpenTelemetryModuleConfig>,
//	): FactoryProvider {
//		return {
//			provide: OPEN_TELEMETRY_SDK_CONFIG,
//			useFactory: async () => {
//				const sdk = new NodeSDK(configuration);
//				await sdk.start();
//				return sdk;
//			},
//		};
//	}
//
//
//	private static buildInjectors(
//		configuration?: Partial<OpenTelemetryModuleConfig>,
//	): FactoryProvider {
//		const injectors = configuration?.traceAutoInjectors ?? [];
//		return {
//			provide: OPEN_TELEMETRY_SDK_INJECTORS,
//			useFactory: async (...injectors) => {
//				for await (const injector of injectors) {
//					if (injector['inject']) await injector.inject();
//				}
//			},
//			inject: [
//				DecoratorInjector,
//				// eslint-disable-next-line @typescript-eslint/ban-types
//				...(injectors as Function[]),
//			],
//		};
//	}
//
//
//	private static buildAsyncProvider(): FactoryProvider {
//		return {
//			provide: OPEN_TELEMETRY_SDK,
//			useFactory: async (config) => {
//				config = { ...OpenTelemetryModuleDefaultConfig, ...config };
//				const sdk = new NodeSDK(config);
//				await sdk.start();
//				return sdk;
//			},
//			inject: [OPEN_TELEMETRY_SDK_CONFIG],
//		};
//	}
//
//	private static buildAsyncInjectors(): FactoryProvider {
//		return {
//			provide: OPEN_TELEMETRY_SDK_INJECTORS,
//			useFactory: async (config, moduleRef: ModuleRef) => {
//				config = { ...OpenTelemetryModuleDefaultConfig, ...config };
//				const injectors =
//						  config.traceAutoInjectors ??
//						  OpenTelemetryModuleDefaultConfig.traceAutoInjectors;
//
//				const decoratorInjector = await moduleRef.create(DecoratorInjector);
//				await decoratorInjector.inject();
//
//				for await (const injector of injectors) {
//					const created = await moduleRef.create(injector);
//					if (created['inject']) await created.inject();
//				}
//
//				return {};
//			},
//			inject: [OPEN_TELEMETRY_SDK_CONFIG, ModuleRef],
//		};
//	}
//
//	private static buildTracer() {
//		return {
//			provide: Tracer,
//			useFactory: (traceService: TraceService) => traceService.getTracer(),
//			inject: [TraceService],
//		};
//	}
//}