import { ConsoleLoggerOptions } from '@nestjs/common'
import Sentry                   from '@sentry/node'
import { Integration }          from '@sentry/types'
import { SentryCloseOptions }   from './sentry-close-options.js'



export type SentryModuleOptions =
  Omit<Sentry.NodeOptions, 'integrations'>
  & {
	 integrations? : Integration[]; close? : SentryCloseOptions;
  }
  & ConsoleLoggerOptions;