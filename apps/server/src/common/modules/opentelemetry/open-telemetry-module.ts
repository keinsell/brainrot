/*
 * MIT License
 *
 * Copyright (c) 2023 Jakub Olan <keinsell@protonmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import {ModuleRef}                        from "@nestjs/core";
import {DynamicModule, FactoryProvider}   from "@nestjs/common";
import {EventEmitterModule}               from "@nestjs/event-emitter";
import {OpenTelemetryService}             from "./service/open-telemetry-service.js";
import {NodeSDK}                          from "@opentelemetry/sdk-node";
import {OPEN_TELEMETRY_SDK_CONFIG}        from "./constant/OPEN_TELEMETRY_SDK_CONFIG.js";
import {OpenTelemetryModuleConfig}        from "./interfaces/opentelemetry-module-config.js";
import {Tracer}                           from "@opentelemetry/sdk-trace-node";
import {OPEN_TELEMETRY_SDK}               from "./constant/OPEN_TELEMETRY_SDK.js";
import {OpentelemetryModuleAsyncOptions}  from "./interfaces/opentelemetry-module-async-options.js";
import {OpenTelemetryModuleDefaultConfig} from "./config/opentelemetry-module-default-config.js";
import {DecoratorInjector}                from "./injector/decorator-injector.js";
import {TraceService}                     from "./service/trace-service.js";
import {OPEN_TELEMETRY_SDK_INJECTORS}     from "./constant/OPEN_TELEMETRY_SDK_INJECTORS.js";



export class OpenTelemetryModule {
	static async forRoot(
		configuration : Partial<OpenTelemetryModuleConfig> = {},
	) : Promise<DynamicModule> {
		configuration   = {...OpenTelemetryModuleDefaultConfig, ...configuration} as any;
		const injectors = configuration?.traceAutoInjectors ?? [];
		return {
			global   : true,
			module   : OpenTelemetryModule,
			imports  : [EventEmitterModule.forRoot()],
			providers: [
				...injectors,
				TraceService,
				OpenTelemetryService,
				DecoratorInjector,
				this.buildProvider(configuration),
				this.buildInjectors(configuration),
				this.buildTracer(),
				{
					provide : OPEN_TELEMETRY_SDK_CONFIG,
					useValue: configuration,
				},
			],
			exports  : [
				TraceService,
				Tracer,
			],
		};
	}

	static async forRootAsync(
		configuration : OpentelemetryModuleAsyncOptions = {},
	) : Promise<DynamicModule> {
		return {
			global   : true,
			module   : OpenTelemetryModule,
			imports  : [
				...configuration?.imports as any,
				EventEmitterModule.forRoot(),
			],
			providers: [
				TraceService,
				OpenTelemetryService,
				this.buildAsyncProvider(),
				this.buildAsyncInjectors(),
				this.buildTracer(),
				{
					provide   : OPEN_TELEMETRY_SDK_CONFIG,
					useFactory: configuration.useFactory as any,
					inject    : configuration.inject,
				},
			],
			exports  : [
				TraceService,
				Tracer,
			],
		};
	}

	private static buildProvider(
		configuration? : Partial<OpenTelemetryModuleConfig>,
	) : FactoryProvider {
		return {
			provide   : OPEN_TELEMETRY_SDK,
			useFactory: async () => {
				const sdk = new NodeSDK(configuration);
				await sdk.start();
				return sdk;
			},
		};
	}

	private static buildInjectors(
		configuration? : Partial<OpenTelemetryModuleConfig>,
	) : FactoryProvider {
		const injectors = configuration?.traceAutoInjectors ?? [];
		return {
			provide   : OPEN_TELEMETRY_SDK_INJECTORS,
			useFactory: async (...injectors) => {
				for await (const injector of injectors) {
					if (injector['inject']) await injector.inject();
				}
			},
			inject    : [
				DecoratorInjector,
				// eslint-disable-next-line @typescript-eslint/ban-types
				...(
					injectors as Function[]
				),
			],
		};
	}

	private static buildAsyncProvider() : FactoryProvider {
		return {
			provide   : OPEN_TELEMETRY_SDK,
			useFactory: async (config) => {
				config    = {...OpenTelemetryModuleDefaultConfig, ...config};
				const sdk = new NodeSDK(config);

				sdk.start();

				return sdk;
			},
			inject    : [OPEN_TELEMETRY_SDK_CONFIG],
		};
	}

	private static buildAsyncInjectors() : FactoryProvider {
		return {
			provide   : OPEN_TELEMETRY_SDK_INJECTORS,
			useFactory: async (config, moduleRef : ModuleRef) => {
				config          = {...OpenTelemetryModuleDefaultConfig, ...config};
				const injectors =
					      config.traceAutoInjectors ??
					      OpenTelemetryModuleDefaultConfig.traceAutoInjectors;

				const decoratorInjector = await moduleRef.create(DecoratorInjector);

				decoratorInjector.inject();

				for await (const injector of injectors) {
					const created = await moduleRef.create(injector);
					if (created['inject']) await created.inject();
				}

				return {};
			},
			inject    : [
				OPEN_TELEMETRY_SDK_CONFIG,
				ModuleRef,
			],
		};
	}

	private static buildTracer() {
		return {
			provide   : Tracer,
			useFactory: (traceService : TraceService) => traceService.getTracer(),
			inject    : [TraceService],
		};
	}
}