import {ConsoleLoggerOptions} from '@nestjs/common';
import {Integration}          from '@sentry/types';
import {SentryCloseOptions}   from "./sentry-close-options.js"
import Sentry                 from "@sentry/node";



export type SentryModuleOptions = Omit<Sentry.NodeOptions, 'integrations'> & {
	integrations? : Integration[]; close? : SentryCloseOptions;
} & ConsoleLoggerOptions;