import {
  InjectionToken,
  OptionalFactoryDependency,
  Type,
}                               from '@nestjs/common'
import { ModuleMetadata }       from '@nestjs/common/interfaces'
import { SentryModuleOptions }  from './sentry-module-options.js'
import { SentryOptionsFactory } from './sentry-options-factory.js'



export interface SentryModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'>
  {
	 inject? : ( InjectionToken | OptionalFactoryDependency )[];
	 useClass? : Type<SentryOptionsFactory>;
	 useExisting? : Type<SentryOptionsFactory>;
	 useFactory? : (...args : any[]) => Promise<SentryModuleOptions> | SentryModuleOptions;
  }