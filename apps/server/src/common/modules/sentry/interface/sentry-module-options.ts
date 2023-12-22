import {ConsoleLoggerOptions} from '@nestjs/common';
import {Integration, Options} from '@sentry/types';
import {SentryCloseOptions}   from "./sentry-close-options.js"



export type SentryModuleOptions = Omit<Options, 'integrations'> & {
	integrations?: Integration[]; close?: SentryCloseOptions;
} & ConsoleLoggerOptions;