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

import { Provider }                        from '@nestjs/common'
import {
  getNodeAutoInstrumentations,
  getResourceDetectors,
  InstrumentationConfigMap,
}                                          from '@opentelemetry/auto-instrumentations-node'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import { W3CTraceContextPropagator }       from '@opentelemetry/core'
import { OTLPTraceExporter }               from '@opentelemetry/exporter-trace-otlp-grpc'
import { Resource }                        from '@opentelemetry/resources'
import {
  AggregationTemporality,
  InMemoryMetricExporter,
  PeriodicExportingMetricReader,
}                                          from '@opentelemetry/sdk-metrics'
import { NodeSDKConfiguration }            from '@opentelemetry/sdk-node'
import {
  BatchSpanProcessor,
  TraceIdRatioBasedSampler,
}                                          from '@opentelemetry/sdk-trace-base'

import PrismaInstrumentation       from '@prisma/instrumentation'
import { __config }                from '../../../../../../configs/global/__config.js'
import { AutomaticTraceInjector }  from '../contract/automatic-trace-injector.js'
import { ControllerInjector }      from '../provider/automatic-tracer/controller-injector.js'
import { DecoratorInjector }       from '../provider/automatic-tracer/decorator-injector.js'
import { EventEmitterInjector }    from '../provider/automatic-tracer/event-emitter-injector.js'
import { GraphQLResolverInjector } from '../provider/automatic-tracer/graphql-resolver-injector.js'
import { GuardInjector }           from '../provider/automatic-tracer/guard-injector.js'
import { LoggerInjector }          from '../provider/automatic-tracer/logger-injector.js'
import { PipeInjector }            from '../provider/automatic-tracer/pipe-injector.js'
import { ScheduleInjector }        from '../provider/automatic-tracer/schedule-injector.js'



export interface OpenTelemetryModuleConfig
  extends Partial<NodeSDKConfiguration>
  {
	 traceAutoInjectors? : Provider<AutomaticTraceInjector>[];
  }


const prismaInstrumentation = new PrismaInstrumentation.PrismaInstrumentation( {
																											middleware : true,
																											enabled    : true,
																										 } )


export const OpenTelemetryModuleDefaultConfig = {
  serviceName         : __config.get( 'SERVICE_NAME' ),
  traceAutoInjectors  : [
	 ControllerInjector,
	 DecoratorInjector,
	 GuardInjector,
	 EventEmitterInjector,
	 ScheduleInjector,
	 PipeInjector,
	 LoggerInjector,
	 GraphQLResolverInjector,
  ],
  autoDetectResources : true,
  resourceDetectors   : [
	 ...getResourceDetectors(),
  ],
  contextManager      : new AsyncLocalStorageContextManager(),
  resource            : new Resource( {
													 lib : '@mph/opentelemetry',
												  } ),
  instrumentations    : [
	 getNodeAutoInstrumentations( {
											  '@opentelemetry/instrumentation-fs'  : {enabled : false},
											  '@opentelemetry/instrumentation-dns' : {enabled : false},
											} as InstrumentationConfigMap ), prismaInstrumentation,
  ],
  sampler             : new TraceIdRatioBasedSampler(),
  traceExporter       : new OTLPTraceExporter(),
  spanProcessor       : new BatchSpanProcessor( new OTLPTraceExporter() ),
  textMapPropagator   : new W3CTraceContextPropagator(),
  metricReader        : new PeriodicExportingMetricReader( {
																				 exporter : new InMemoryMetricExporter(
																					AggregationTemporality.CUMULATIVE ),
																			  } ),
} as OpenTelemetryModuleConfig