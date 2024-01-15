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

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
}                          from '@nestjs/common'
import * as Sentry         from '@sentry/node'
import {
  catchError,
  finalize,
  Observable,
  throwError,
}                          from 'rxjs'
import { SentryServiceV2 } from './sentry-service-v2.js'



/**
 * We must be in Request scope as we inject SentryService
 */
@Injectable( {scope : Scope.REQUEST} )
export class SentryInterceptorV2
  implements NestInterceptor
  {
	 constructor(private sentryService : SentryServiceV2) {}

	 intercept(
		context : ExecutionContext,
		next : CallHandler,
	 ) : Observable<any>
		{
		  // start a child span for performance tracing
		  const span = this.sentryService.startChild( {op : `route handler`} )

		  return next.handle().pipe(
			 catchError( (error) => {
				// capture the error, you can filter out some errors here
				Sentry.captureException( error, this.sentryService.span.getTraceContext() as any )

				// throw again the error
				return throwError( () => error )
			 } ),
			 finalize( () => {
				span.finish()
				this.sentryService.span.finish()
			 } ),
		  )
		}
  }