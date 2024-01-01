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

import {Request}                   from 'express';
import {Inject, Injectable, Scope} from '@nestjs/common';
import {REQUEST}                   from '@nestjs/core';
import * as Sentry                 from '@sentry/node';
import {Span, SpanContext}         from '@sentry/types';
import {TraceService}              from "../../observability/tracing/opentelemetry/lib/service/trace-service.js";



/**
 * Because we inject REQUEST we need to set the service as request scoped
 */
@Injectable({scope: Scope.REQUEST})
export class SentryServiceV2 {
	@Inject(TraceService) tracer : TraceService;

	/**
	 * When injecting the service it will create the main transaction
	 *
	 * @param request
	 */
	constructor(@Inject(REQUEST) private request : Request) {
		const {method, headers, url} = this.request;

		// recreate transaction based from HTTP request
		const transaction = Sentry.startTransaction({
			name: `${method} ${url}`,
			op  : 'transaction',
		});

		// setup context of newly created transaction
		Sentry.getCurrentHub().configureScope((scope) => {
			scope.setSpan(transaction);

			// customize your context here
			scope.setContext('http', {
				method,
				url,
				headers,
				http_method: method,
			});
		});
	}

	/**
	 * Return the current span defined in the current Hub and Scope
	 */
	get span() : Span {
		return Sentry.getCurrentHub().getScope().getSpan()!;
		// return getActiveSpan()!
	}

	/**
	 * This will simply start a new child span in the current span
	 *
	 * @param spanContext
	 */
	startChild(spanContext : SpanContext) {
		return this.span.startChild(spanContext);
	}
}