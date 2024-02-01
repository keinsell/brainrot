import { Logger }                        from '@nestjs/common'
import { NestFactory }                   from '@nestjs/core'
import Sentry                            from '@sentry/node'
import delay                             from 'delay'
import type { NextFunction }             from 'express'
import ms                                from 'ms'
import process                           from 'node:process'
import { buildCompodocDocumentation }    from './common/modules/documentation/compodoc/compodoc.js'
import { buildSwaggerDocumentation }     from './common/modules/documentation/swagger/swagger.js'
import { executePrismaRelatedProcesses } from './common/modules/resources/prisma/utils/execute-prisma-related-processes.js'
import {
	 __appConfig,
	 __config,
}                                        from './configs/global/__config.js'
import { isDevelopment }                 from './configs/helper/is-development.js'
import { StaticFeatureFlags }            from './configs/static-feature-flags.js'
import { Container }                     from './container.js'
import { migrateDatabase }               from './hooks/post-start/migrate-database.js'
import type {
	 ExpressRequest,
	 ExpressResponse,
}                                        from './types/express-response.js'
import { portAllocator }                 from './utilities/network-utils/port-allocator.js'



export async function bootstrap()
	 {
		  // Bootstrap application
		  const app = await NestFactory.create( Container, {
				abortOnError  : false,
				autoFlushLogs : true,
				bufferLogs    : true,
				snapshot      : isDevelopment(),
		  } )
		  
		  // Implement logger used for bootstrapping and notifying about application state
		  const logger = new Logger( 'Bootstrap' )
		  
		  await executePrismaRelatedProcesses()
		  
		  Sentry.addIntegration( new Sentry.Integrations.Http( {
																					  tracing     : true,
																					  breadcrumbs : true,
																				 } ) )
		  Sentry.addIntegration( new Sentry.Integrations.Express( {
																						  app : app.getHttpAdapter()
																									  .getInstance(),
																					 } ) )
		  
		  // Enable graceful shutdown hooks
		  app.enableShutdownHooks()
		  
		  // Build swagger documentation
		  await buildSwaggerDocumentation( app )
		  buildCompodocDocumentation()
		  
		  // The error handler must be before any other error middleware and after all controllers
		  app.use( Sentry.Handlers.errorHandler() )
		  //	 app.useGlobalFilters( new HttpExceptionFilter() )
		  
		  // Optional fallthrough error handler
		  app.use( function onError(
				_err : Error,
				_req : ExpressRequest,
				res : ExpressResponse,
				_next : NextFunction,
		  )
					  {
							res.statusCode = 500
							res.end( (
											 res as any
										).sentry + '\n' )
					  } )
		  
		  const PORT = __config.get( 'PORT' )
		  
		  // Listen on selected application port (with grace)
		  let openPort = await portAllocator( PORT )
		  
		  if ( openPort.wasReplaced )
				{
					 logger.warn(
						  `Application performed port availability check and ::${ PORT } is not available, found a new shiny ::${ openPort.port } instead. If you believe this is a mistake, please check your environment variables and processes that are running on your machine.` )
				}
		  else
				{
					 logger.log( `Port availability check succeeded and requested ::${ PORT } is available` )
				}
		  
		  let isApplicationListening = false
		  let retryDelay             = ms( '5s' )
		  let retryCount             = 3
		  
		  const PROTOCOL = __config.get( 'PROTOCOL' )
		  const HOST     = __config.get( 'HOST' )
		  const NODE_ENV = __config.get( 'NODE_ENV' )
		  
		  const applicationUrl = `${ PROTOCOL }://${ HOST }:${ openPort.port }`
		  
		  while ( !isApplicationListening )
				{
					 try
						  {
								await app.listen( openPort.port, () =>
								{
									 logger.verbose( `${ '-'.repeat( 54 ) }` )
									 logger.log( `🚀 Application started on ${ applicationUrl } in ${ NODE_ENV } mode` )
									 
									 logger.verbose( `${ '-'.repeat( 54 ) }` )
									 logger.verbose( `📄 Compodoc endpoint: ${ applicationUrl + '/docs' }` )
									 logger.verbose( `📄 Swagger endpoint: ${ applicationUrl + '/api' }` )
									 if ( StaticFeatureFlags.isGraphQLRunning )
										  {
												logger.verbose( `🧩 GraphQL is running on: ${ applicationUrl + '/graphql' }` )
										  }
									 logger.verbose(
										  `🩺 Healthcheck endpoint: ${ applicationUrl +
																				__config.get( 'APPLICATION' ).HEALTHCHECK_ENDPOINT }` )
									 
									 if ( isDevelopment() && StaticFeatureFlags.shouldRunPrismaStudio )
										  {
												logger.verbose( `🧩 Prisma Admin is running on: http://localhost:${ __appConfig.PRISMA_ADMIN_PORT }` )
										  }
									 
									 logger.verbose( `${ '-'.repeat( 54 ) }` )
								} )
								isApplicationListening = true
						  }
					 catch ( e )
						  {
								logger.error( `Error while trying to start application: ${ (
									 e as unknown as Error
								).message }` )
								await delay( retryDelay )
								openPort = await portAllocator( PORT )
								retryDelay *= 2
						  }
					 
					 if ( retryCount === 0 )
						  {
								logger.error( `Application failed to start after ${ retryCount } attempts` )
								process.exit( 1 )
						  }
					 
					 retryCount--
				}
		  
		  await migrateDatabase()
		  
		  return app
	 }
