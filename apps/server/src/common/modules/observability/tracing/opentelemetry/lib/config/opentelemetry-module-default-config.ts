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

import {NodeSDKConfiguration}      from "@opentelemetry/sdk-node";
import {
	AsyncLocalStorageContextManager,
}                                  from "@opentelemetry/context-async-hooks";
import {Resource}                  from "@opentelemetry/resources";
import {
	getNodeAutoInstrumentations,
	getResourceDetectors,
}                                  from "@opentelemetry/auto-instrumentations-node";
import {Provider}                  from "@nestjs/common";
import {
	AutoTraceInjector,
}                                  from "../injector/auto-trace-injector.js";
import {
	ControllerInjector,
}                                  from "../injector/controller-injector.js";
import {
	EventEmitterInjector,
}                                  from "../injector/event-emitter-injector.js";
import {
	ScheduleInjector,
}                                  from "../injector/schedule-injector.js";
import {
	PipeInjector,
}                                  from "../injector/pipe-injector.js";
import {
	LoggerInjector,
}                                  from "../injector/logger-injector.js";
import {
	GuardInjector,
}                                  from "../injector/guard-injector.js";
import {
	GraphQLResolverInjector,
}                                  from "../injector/graphql-resolver-injector.js";
import {W3CTraceContextPropagator} from "@opentelemetry/core";
import {
	NestLoggerSpanExporter,
}                                  from "../service/nest-logger-span-exporter.js";
import {
	SimpleSpanProcessor,
}                                  from "@opentelemetry/sdk-trace-base";
import {PrismaInstrumentation}     from "@prisma/instrumentation";
import {
	AggregationTemporality,
	InMemoryMetricExporter,
	PeriodicExportingMetricReader,
}                                  from "@opentelemetry/sdk-metrics";
import {
	config,
}                                  from "../../../../../../../configs/service/configuration-service.js";



export interface OpenTelemetryModuleConfig
	extends Partial<NodeSDKConfiguration> {
	traceAutoInjectors? : Provider<AutoTraceInjector>[];
}


export const OpenTelemetryModuleDefaultConfig = {
	serviceName        : config.get("SERVICE_NAME"),
	traceAutoInjectors : [
		ControllerInjector,
		GuardInjector,
		EventEmitterInjector,
		ScheduleInjector,
		PipeInjector,
		LoggerInjector,
		GraphQLResolverInjector,
	],
	autoDetectResources: true,
	resourceDetectors  : [
		...getResourceDetectors(),
	],
	contextManager     : new AsyncLocalStorageContextManager(),
	resource           : new Resource({
		lib: '@mph/opentelemetry',
	}),
	instrumentations   : [
		getNodeAutoInstrumentations({
			// Disable filesystem instrumentation
			"@opentelemetry/instrumentation-fs": {
				enabled: false,
			},
		}),
		new PrismaInstrumentation({middleware: true, enabled: true}),
	],
	traceExporter      : new NestLoggerSpanExporter(),
	spanProcessor      : new SimpleSpanProcessor(new NestLoggerSpanExporter()),
	textMapPropagator  : new W3CTraceContextPropagator(),
	metricReader       : new PeriodicExportingMetricReader({
		exporter: new InMemoryMetricExporter(AggregationTemporality.CUMULATIVE),
	}),
} as OpenTelemetryModuleConfig;