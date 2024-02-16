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

import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'
import {ApolloDriver, type ApolloDriverConfig}    from '@nestjs/apollo'
import {Module, OnModuleDestroy, OnModuleInit}    from '@nestjs/common'
import {GraphQLModule}                             from '@nestjs/graphql'
import {join}                                      from 'node:path'
import process                                     from 'node:process'
import {StaticFeatureFlags}                        from '../../conf/static-feature-flags.js'
import {FooResolver}                               from './hello-world-resolver.js'



@Module({
	imports:   [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver:                   ApolloDriver,
			autoSchemaFile:           join(process.cwd(), 'schema.gql'),
			playground:               false,
			plugins:                  [ApolloServerPluginLandingPageLocalDefault() as any],
			allowBatchedHttpRequests: true,
			introspection:            true,
			transformAutoSchemaFile:  true,
			autoTransformHttpErrors:  true,
			sortSchema:               true,
			cache:                    'bounded',
			persistedQueries:         {},
			stopOnTerminationSignals: true,
		}),
	],
	providers: [FooResolver],
})
export class GraphqlModule implements OnModuleInit, OnModuleDestroy {
	public onModuleDestroy(): any {
	}


	public onModuleInit(): any {
		StaticFeatureFlags.isGraphQLRunning = true
	}
}