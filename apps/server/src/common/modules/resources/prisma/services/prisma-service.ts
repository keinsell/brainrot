import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  Optional,
}                               from '@nestjs/common'
import Sentry                   from '@sentry/node'
import delay                    from 'delay'
import ms                       from 'ms'
import { StartedTestContainer } from 'testcontainers'

import { isProduction }            from '../../../../../configs/helper/is-production.js'
import {
  Prisma,
  PrismaClient,
}                                  from '../../../../../vendor/prisma/index.js'
import { ApplicationState }        from '../../../../state.js'
import { PRISMA_SERVICE_OPTIONS } from '../constants/PRISMA_SERVICE_OPTIONS.js'
import { PrismaServiceOptions }   from '../structures/prisma-service-options.js'



@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'>
  implements OnModuleInit,
				 OnModuleDestroy
  {
	 private logger : Logger = new Logger( 'prisma' )
	 private _testcontainer : StartedTestContainer | undefined


	 constructor(@Optional() @Inject(
		PRISMA_SERVICE_OPTIONS ) private readonly prismaServiceOptions : PrismaServiceOptions = {})
		{
		  super( {
					  ...prismaServiceOptions.prismaOptions,
					  log         : [
						 {
							emit  : 'event',
							level : 'query',
						 },
					  ],
					  errorFormat : 'minimal',
					} )

		  if ( this.prismaServiceOptions.middlewares )
			 {
				this.prismaServiceOptions.middlewares.forEach( (middleware) => this.$use( middleware ) )
			 }

		  // Integrate with Sentry
		  if ( Sentry.getCurrentHub().getClient()?.getOptions().enabled )
			 {
				this.logger.verbose( `Sentry is enabled, Prisma will send events to Sentry.` )

				const hub    = Sentry.getCurrentHub()
				const client = hub.getClient()

				if ( client )
				  {
					 Sentry.addIntegration( new Sentry.Integrations.Prisma( {
																								 client : this,
																							  } ) )
				  }
			 }
		}


	 async onModuleInit()
		{
		  // Enable custom logger for Prisma
		  this.setupLogging()

		  // Use an immediately invoked asynchronous function
		  // to handle the connection in the background.
		  //noinspection ES6MissingAwait
		  this.startConnection()

		  if ( this.prismaServiceOptions.explicitConnect )
			 {
				await this.$connect()
			 }
		}


	 async onModuleDestroy()
		{
		  this.logger.debug( 'Closing prisma connection...' )
		  await this.$disconnect().then( () => {
			 ApplicationState.isDatabaseConnected = false
			 this.logger.log( 'Prisma connection was closed successfully.' )
		  } )

		  // If test container was attached, stop it.
		  if ( this._testcontainer )
			 {
				this.logger.debug( 'Testcontainer is running, stopping it...' )
				await this._testcontainer.stop()
			 }
		}


	 private async startConnection()
		{
		  ApplicationState.isDatabaseConnected = false
		  let connectionRetryDelay             = ms( '5s' )

		  // Handle retries to the database without blocking
		  while ( !ApplicationState.isDatabaseConnected )
			 {
				// TODO: If connection was not made in 10s application should start in-memory database instead prisma,
				//  or run a container with postgres to be used with prisma and then connect - this should be applicable
				//  only to development mode.
				if ( connectionRetryDelay > ms( '5s' ) )
				  {
					 await this.startTestContainer()
				  }

				try
				  {
					 await this.$connect()
					 this.logger.log( 'Connection with a database established.' )
					 ApplicationState.isDatabaseConnected = true
				  }
				catch ( error )
				  {
					 this.logger.error(
						`Server failed to connect to database, retrying in ${ms( connectionRetryDelay )}...` )
					 this.logger.error( `${JSON.stringify( error )}` )
					 console.error( error )
					 await delay( connectionRetryDelay )
					 connectionRetryDelay = connectionRetryDelay * 2

					 if ( isProduction() )
						{
						  Sentry.captureException( error )
						}
				  }
			 }
		}


	 // TODO: Improve Prisma Logging (https://www.npmjs.com/package/prisma-query-log)
	 // TODO: https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging
	 private setupLogging()
		{
		  this.$on( 'error', (event) => {
			 this.logger.error( event.message )
		  } )
		  this.$on( 'warn', (event) => {
			 this.logger.warn( event.message )
		  } )
		  this.$on( 'info', (event) => {
			 this.logger.verbose( event.message )
		  } )
		  this.$on( 'query', (event) => {
			 this.logger.verbose( event.query )
		  } )
		}


	 private async startTestContainer()
		{
		  // If connection wasn't created after 10s in development mode start test container

		  //this.logger.debug("Application could not find a running database, however as application is working" + " in
		  // development mode, application will start a docker container with postgres.")  // Instantiate a generic
		  // container with PostgreSQL latest version const postgres: TestContainer = new
		  // GenericContainer("postgres:latest") postgres.withEnvironment({ "POSTGRES_USER":     "test_user",
		  // "POSTGRES_PASSWORD": "test_password", "POSTGRES_DB":       "test_db", }).withExposedPorts(5432)
		  // this.logger.verbose(`Created Testcontainer, ${JSON.stringify(postgres)}`)  this._testcontainer = await
		  // postgres.start() const logStream     = await this._testcontainer.logs()  const containerLogger = new
		  // Logger(`postgres:${this._testcontainer.getId()}`)  containerLogger.verbose(`Container started...`)
		  // logStream.on("data", (data) => { const logLine = data.toString() // Remove \n from lines
		  // logLine.replace(/[\r\n]+/g, '');  if (logLine === "") { } else { containerLogger.verbose(logLine); } });  //
		  // Get the docker container port const port  = this._testcontainer.getMappedPort(5432) const host  =
		  // this._testcontainer.getHost() const dbUri = `postgresql://test_user:test_password@${host}:${port}/test_db`
		  // this.logger.verbose(`Postgres container is available at: ${dbUri}`)

		}
  }