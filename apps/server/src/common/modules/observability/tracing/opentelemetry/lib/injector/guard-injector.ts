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
  CanActivate,
  Injectable,
  Logger,
}                            from '@nestjs/common'
import { GUARDS_METADATA }   from '@nestjs/common/constants.js'
import {
  APP_GUARD,
  ModulesContainer,
}                            from '@nestjs/core'
import { AutoTraceInjector } from './auto-trace-injector.js'
import { BaseTraceInjector } from './base-trace-injector.js'



@Injectable()
export class GuardInjector
  extends BaseTraceInjector
  implements AutoTraceInjector
  {
	 private readonly loggerService = new Logger()

	 constructor(protected readonly modulesContainer : ModulesContainer)
		{
		  super( modulesContainer )
		}

	 public inject()
		{
		  const controllers = this.getControllers()

		  for ( const controller of controllers )
			 {
				if ( this.isGuarded( controller.metatype ) )
				  {
					 const guards = this.getGuards( controller.metatype ).map( (guard) => {
						const prototype       = guard[ 'prototype' ] ?? guard
						const traceName       = `Guard->${controller.name}.${prototype.constructor.name}`
						prototype.canActivate = this.wrap( prototype.canActivate, traceName, {
						  controller : controller.name,
						  guard      : prototype.constructor.name,
						  scope      : 'CONTROLLER',
						} )
						Object.assign( prototype, this )
						this.loggerService.log( `Mapped ${traceName}`, this.constructor.name )
						return guard
					 } )

					 if ( guards.length > 0 )
						{
						  Reflect.defineMetadata( GUARDS_METADATA, guards, controller.metatype )
						}
				  }

				const keys = this.metadataScanner.getAllFilteredMethodNames(
				  controller.metatype.prototype,
				)

				for ( const key of keys )
				  {
					 if ( this.isGuarded( controller.metatype.prototype[ key ] ) )
						{
						  const guards = this.getGuards( controller.metatype.prototype[ key ] ).map(
							 (guard) => {
								const prototype       = guard[ 'prototype' ] ?? guard
								const traceName       = `Guard->${controller.name}.${controller.metatype.prototype[ key ].name}.${prototype.constructor.name}`
								prototype.canActivate = this.wrap(
								  prototype.canActivate,
								  traceName,
								  {
									 controller : controller.name,
									 guard      : prototype.constructor.name,
									 method     : controller.metatype.prototype[ key ].name,
									 scope      : 'CONTROLLER_METHOD',
								  },
								)
								Object.assign( prototype, this )
								this.loggerService.log(
								  `Mapped ${traceName}`,
								  this.constructor.name,
								)
								return guard
							 },
						  )

						  if ( guards.length > 0 )
							 {
								Reflect.defineMetadata(
								  GUARDS_METADATA,
								  guards,
								  controller.metatype.prototype[ key ],
								)
							 }
						}
				  }
			 }

		  this.injectGlobals()
		}

	 private injectGlobals()
		{
		  const providers = this.getProviders()

		  for ( const provider of providers )
			 {
				if (
				  typeof provider.token === 'string' &&
				  provider.token.includes( APP_GUARD ) &&
				  !this.isAffected( provider.metatype.prototype.canActivate )
				)
				  {
					 const traceName                         = `Guard->Global->${provider.metatype.name}`
					 provider.metatype.prototype.canActivate = this.wrap(
						provider.metatype.prototype.canActivate,
						traceName,
						{
						  guard : provider.metatype.name,
						  scope : 'GLOBAL',
						},
					 )
					 Object.assign( provider.metatype.prototype, this )
					 this.loggerService.log( `Mapped ${traceName}`, this.constructor.name )
				  }
			 }
		}

	 private getGuards(prototype) : CanActivate[]
		{
		  return Reflect.getMetadata( GUARDS_METADATA, prototype ) || []
		}

	 private isGuarded(prototype) : boolean
		{
		  return Reflect.hasMetadata( GUARDS_METADATA, prototype )
		}
  }