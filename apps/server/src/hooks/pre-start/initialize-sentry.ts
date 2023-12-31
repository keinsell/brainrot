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



import Sentry                                from "@sentry/node";
import {Logger}                              from "@nestjs/common";
import {setupGlobalHub}                      from "@sentry/opentelemetry";
import {ProfilingIntegration}                from "@sentry/profiling-node";
import {config, isDevelopment, isProduction} from "../../configs/configuration-service.js";



export function initializeSentry() : void {
	new Logger().log(`Initializing Sentry... ${config.get('SENTRY_DSN')}`);


	// Turn ON if integrating with OTEL
	setupGlobalHub();

	// Non-OTEL Configuration
	// Sentry.init({
	// 	dsn                : SENTRY_DSN,
	// 	autoSessionTracking: true,
	// 	tracesSampleRate   : 1.0,
	// 	profilesSampleRate : 1.0,
	// 	enableTracing      : true,
	// 	sampleRate         : 1.0,
	// 	enabled            : true,
	// 	debug              : true,
	// 	// instrumenter       : "otel",
	// 	// integrations       : [
	// 	// 	// new Sentry.Integrations.Console(),
	// 	// 	// new Sentry.Integrations.Http({tracing: true, breadcrumbs: true}),
	// 	// 	// new Sentry.Integrations.Context(),
	// 	// 	// new Sentry.Integrations.Prisma(),
	// 	// 	// new ProfilingIntegration(),
	// 	// ],
	// })

	// OTEL Configuration
	Sentry.init({
		dsn                : config.get('SENTRY_DSN'),
		autoSessionTracking: true,
		tracesSampleRate   : 1.0,
		profilesSampleRate : 1.0,
		sampleRate         : 1.0,
		enabled            : isProduction(),
		enableTracing      : isProduction(),
		debug              : isDevelopment(),
		profilesSampler    : () => 1.0,
		instrumenter       : "otel",
		integrations       : [
			new ProfilingIntegration(),
		],
		attachStacktrace   : true,
	})

	new Logger().log(`Sentry initialized!`);
}