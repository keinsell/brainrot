/*
 * MIT License
 *
 * Copyright (c) 2024 Jakub Olan <keinsell@protonmail.com>
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

import Sentry, { type EventHint } from '@sentry/node'
import { ProfilingIntegration }   from '@sentry/profiling-node'
import type {
  Integration,
  TransactionEvent,
}                                 from '@sentry/types'
import { __config }               from '../global/__config.js'
import { isDebug }                from '../helper/is-debug.js'
import { isDevelopment }          from '../helper/is-development.js'



export interface ISentryConfiguration
  extends Sentry.NodeOptions
  {
  }


export const SENTRY_CONFIGURATION : ISentryConfiguration = {
  dsn                 : __config.get( 'SENTRY_DSN' ),
  autoSessionTracking : true, // It's recommended to set this to true in development environments and a little one for
										// production where traffic is higher, meanwhile it's recommened to drop traces and
										// transactions after delivery which can be setupped at [Project] > Settings > Client
										// Keys (DSN) at Sentry dashboard.
  tracesSampleRate      : isDevelopment() ? 1 : 0.1,
  profilesSampleRate    : isDevelopment() ? 1 : 0.1,
  sampleRate            : 1,
  enabled               : true,
  enableTracing         : true,
  debug                 : ( isDevelopment() || isDebug() ),
  instrumenter          : 'otel',
  environment           : __config.get( 'NODE_ENV' ),
  integrations          : [
	 ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
	 new ProfilingIntegration(),
	 // new Sentry.Integrations.Anr({captureStackTrace: true, anrThreshold: 2_000}),
	 new Sentry.Integrations.ContextLines(),
	 new Sentry.Integrations.Http( {
												tracing     : true,
												breadcrumbs : true,
											 } ),
	 new Sentry.Integrations.OnUncaughtException(),
	 // https://docs.sentry.io/platforms/node/guides/connect/configuration/integrations/default-integrations/#onunhandledrejection
	 new Sentry.Integrations.OnUnhandledRejection( {mode : 'warn'} ),
	 new Sentry.Integrations.FunctionToString(),
	 new Sentry.Integrations.RequestData(),
	 // https://docs.sentry.io/platforms/node/guides/connect/configuration/integrations/default-integrations/#contextlines
	 // new Sentry.Integrations.LocalVariables( {captureAllExceptions : true} ),
	 new Sentry.Integrations.LinkedErrors(),
	 /**  This integration fetches the names of all currently installed Node modules and attaches the list to the event.
	  * Once fetched, Sentry will cache the list for later reuse.
	  * @see  https://docs.sentry.io/platforms/node/guides/connect/configuration/integrations/default-integrations/#contextlines
	  * */
	 new Sentry.Integrations.Modules(),
	 new Sentry.Integrations.Console(),
	 new Sentry.Integrations.Context(),
	 // https://docs.sentry.io/platforms/node/guides/connect/configuration/integrations/default-integrations/#contextlines
	 new Sentry.Integrations.ContextLines( {frameContextLines : 250} ),
	 new Sentry.Integrations.Postgres(),
	 // TODO: Spotlight is good option for front-end
	 // new Sentry.Integrations.Spotlight(),
	 //	 new RewriteFrames( {
	 //								 root : __rootDir__,
	 //							  } ),
  ].filter( (x : Integration) => x.name !== 'Prisma' ),
  attachStacktrace      : true, //  includeLocalVariables : true,
  ignoreErrors          : [ 'ServerException', 'ApiException' ],
  beforeSendTransaction : (
	 event : TransactionEvent,
	 hint : EventHint,
  ) => {
	 if ( !event.transaction )
		{
		  return null
		}

	 return event
  },
}