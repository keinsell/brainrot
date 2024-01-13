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



import * as Sentry            from "@sentry/node";
import {Logger}               from "@nestjs/common";
import {setupGlobalHub}       from "@sentry/opentelemetry";
import {SENTRY_CONFIGURATION} from "../../configs/config-set/sentry-configuration.js";
import {__config}             from "../../configs/global/__config.js";



export function initializeSentry() : void {
	new Logger().log(`Initializing Sentry... ${__config.get('SENTRY_DSN')}`);

	// Turn ON if integrating with OTEL
	setupGlobalHub();

	// OTEL Configuration
	Sentry.init({
		...SENTRY_CONFIGURATION,
	})

	new Logger().log(`Sentry initialized!`);

	const integrations = Sentry.getCurrentHub()?.getClient()?.getOptions()?.integrations || [];

	new Logger().log(`Sentry have initialized ${integrations.length} integrations: [${integrations.map(integration => integration.name)
	                                                                                              .join(', ')}]`);
}