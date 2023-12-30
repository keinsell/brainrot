import {SentryModuleOptions} from "./sentry-module-options.js"



export interface SentryOptionsFactory {
	createSentryModuleOptions() : Promise<SentryModuleOptions> | SentryModuleOptions;
}