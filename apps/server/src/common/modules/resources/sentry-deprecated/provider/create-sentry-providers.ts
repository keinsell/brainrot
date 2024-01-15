import { Provider }            from '@nestjs/common'
import { SENTRY_TOKEN }        from '../constant/SENTRY_TOKEN.js'
import { SentryModuleOptions } from '../interface/sentry-module-options.js'
import { SentryService }       from '../service/sentry-service.js'



export function createSentryProviders(options : SentryModuleOptions) : Provider
  {
	 return {
		provide  : SENTRY_TOKEN,
		useValue : new SentryService( options ),
	 }
  }