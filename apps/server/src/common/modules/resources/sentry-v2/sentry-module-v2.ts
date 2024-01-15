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

import { Module }                from '@nestjs/common'
import { APP_INTERCEPTOR }       from '@nestjs/core'
import Sentry                    from '@sentry/node'
import { SENTRY_MODULE_OPTIONS } from '../sentry-deprecated/constant/SENTRY_MODULE_OPTIONS.js'
import { SentryInterceptorV2 }   from './sentry-interceptor-v2.js'
import { SentryServiceV2 }       from './sentry-service-v2.js'
import { getSentry }             from './utils/get-sentry.js'



@Module( {
			  providers : [ SentryServiceV2 ],
			} )
export class SentryModuleV2
  {
	 static forRoot(options : Sentry.NodeOptions)
		{
		  // Initialize Sentry if was not initialized before.
		  if ( !getSentry() )
			 {
				Sentry.init( options )
			 }

		  return {
			 module    : SentryModuleV2,
			 providers : [
				{
				  provide  : SENTRY_MODULE_OPTIONS,
				  useValue : options,
				},
				SentryServiceV2,
				{
				  provide  : APP_INTERCEPTOR,
				  useClass : SentryInterceptorV2,
				},
			 ],
			 exports   : [ SentryServiceV2 ],
		  }
		}
  }