import {DynamicModule, Global, Module, Provider, Type} from '@nestjs/common';
import {SENTRY_MODULE_OPTIONS}                         from "./constant/SENTRY_MODULE_OPTIONS.js"
import {SENTRY_TOKEN}                                  from "./constant/SENTRY_TOKEN.js"
import {SentryModuleAsyncOptions}                      from "./interface/sentry-module-async-options.js"
import {SentryModuleOptions}                           from "./interface/sentry-module-options.js"
import {SentryOptionsFactory}                          from "./interface/sentry-options-factory.js"
import {createSentryProviders}                         from "./provider/create-sentry-providers.js"
import {SentryService}                                 from "./service/sentry-service.js"



@Global() @Module({})
export class SentryModule {
	public static forRoot(options : SentryModuleOptions) : DynamicModule {
		const provider = createSentryProviders(options);

		return {
			exports  : [
				provider,
				SentryService,
			],
			module   : SentryModule,
			providers: [
				provider,
				SentryService,
			],
		};
	}


	public static forRootAsync(options : SentryModuleAsyncOptions) : DynamicModule {
		const provider : Provider = {
			inject    : [SENTRY_MODULE_OPTIONS],
			provide   : SENTRY_TOKEN,
			useFactory: (options : SentryModuleOptions) => new SentryService(options),
		};

		return {
			exports  : [
				provider,
				SentryService,
			],
			imports  : options.imports,
			module   : SentryModule,
			providers: [
				...this.createAsyncProviders(options),
				provider,
				SentryService,
			],
		};
	}


	private static createAsyncProviders(options : SentryModuleAsyncOptions) : Provider[] {
		if (options.useExisting || options.useFactory) {
			return [this.createAsyncOptionsProvider(options)];
		}
		const useClass = options.useClass as Type<SentryOptionsFactory>;
		return [
			this.createAsyncOptionsProvider(options),
			{
				provide: useClass,
				useClass,
			},
		];
	}


	private static createAsyncOptionsProvider(options : SentryModuleAsyncOptions) : Provider {
		if (options.useFactory) {
			return {
				inject    : options.inject || [],
				provide   : SENTRY_MODULE_OPTIONS,
				useFactory: options.useFactory,
			};
		}
		const inject = [
			options.useClass || options.useExisting,
		] as any;

		return {
			provide   : SENTRY_MODULE_OPTIONS,
			useFactory: async (optionsFactory : SentryOptionsFactory) => await optionsFactory.createSentryModuleOptions(),
			inject,
		};
	}
}