import {Logger, ValidationPipe}        from '@nestjs/common'
import {HttpAdapterHost, NestFactory}  from '@nestjs/core'
import {NestExpressApplication}        from "@nestjs/platform-express"
import Sentry                          from "@sentry/node"
import delay                           from 'delay'
import ms                              from 'ms'
import process                         from 'node:process'
import {HttpExceptionFilter}           from "./common/filters/exception-filter/http-exception-filter.js"
import {LoggerNestjsProxy}             from "./common/logger/nestjs-logger-proxy.js"
import {buildCompodocDocumentation}    from './common/modules/documentation/compodoc/compodoc.js'
import {buildSwaggerDocumentation}     from './common/modules/documentation/swagger/swagger.js'
import {executePrismaRelatedProcesses} from './common/modules/resources/prisma/utils/execute-prisma-related-processes.js'
import {__appConfig, __config}         from './configs/global/__config.js'
import {isDevelopment}                 from './configs/helper/is-development.js'
import {StaticFeatureFlags}            from './configs/static-feature-flags.js'
import {Container}                     from './container.js'
import {migrateDatabase}               from './hooks/post-start/migrate-database.js'
import {portAllocator}                 from './utilities/network-utils/port-allocator.js'



export async function bootstrap() {
	// Bootstrap application
	const app: NestExpressApplication = await NestFactory.create(Container, {
		autoFlushLogs: true,
		cors:          true,
		rawBody:       true,
		preview:       false,
		bufferLogs:    true,
		snapshot:      isDevelopment(),
		logger:        new LoggerNestjsProxy(),
	})

	//app.use(bodyParser({limit: '16mb'}));
	app.useGlobalPipes(new ValidationPipe());
	app.useBodyParser('json', {limit: '16mb'});

	// Implement logger used for bootstrapping and notifying about application state
	const logger = new Logger('Bootstrap')

	await executePrismaRelatedProcesses()

	// Build swagger documentation
	await buildSwaggerDocumentation(app)
	buildCompodocDocumentation()

	// The error handler must be before any other error middleware and after all controllers
	app.use(Sentry.Handlers.errorHandler())
	const httpAdapterHost = app.get(HttpAdapterHost);
	app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost))

	// Optional fallthrough error handler
	//app.use(function onError(_err: Error, _req: ExpressRequest, res: ExpressResponse, _next: NextFunction) {
	//	res.statusCode = 500
	//	res.end((
	//		res as any
	//	).sentry + '\n')
	//})

	// Enable graceful shutdown hooks
	app.enableShutdownHooks()

	const PORT = __config.get('PORT')

	// Listen on selected application port (with grace)
	let openPort = await portAllocator(PORT)

	if (openPort.wasReplaced) {
		logger.warn(`Application performed port availability check and ::${PORT} is not available, found a new shiny ::${openPort.port} instead. If you believe this is a mistake, please check your environment variables and processes that are running on your machine.`)
	} else {
		logger.log(`Port availability check succeeded and requested ::${PORT} is available`)
	}

	let isApplicationListening = false
	let retryDelay             = ms('5s')
	let retryCount             = 3

	const PROTOCOL = __config.get('PROTOCOL')
	const HOST     = __config.get('HOST')
	const NODE_ENV = __config.get('NODE_ENV')

	const applicationUrl = `${PROTOCOL}://${HOST}:${openPort.port}`

	while (!isApplicationListening) {
		try {
			await app.listen(openPort.port, async () => {
				logger.verbose(`${'-'.repeat(54)}`)
				logger.log(`🚀 Application started on ${applicationUrl} in ${NODE_ENV} mode`)

				logger.verbose(`${'-'.repeat(54)}`)
				logger.verbose(`📄 Compodoc endpoint: ${applicationUrl + '/docs'}`)
				logger.verbose(`📄 Swagger endpoint: ${applicationUrl + '/api'}`)
				if (StaticFeatureFlags.isGraphQLRunning) {
					logger.verbose(`🧩 GraphQL is running on: ${applicationUrl + '/graphql'}`)
				}
				logger.verbose(`🩺 Healthcheck endpoint: ${applicationUrl + __config.get('APPLICATION').HEALTHCHECK_ENDPOINT}`)

				if (isDevelopment() && StaticFeatureFlags.shouldRunPrismaStudio) {
					logger.verbose(`🧩 Prisma Admin is running on: http://localhost:${__appConfig.PRISMA_ADMIN_PORT}`)
				}

				logger.verbose(`${'-'.repeat(54)}`)

				//if (__config.get("FEATURE").ENABLE_TUNNEL) {
				//	const tunnel = await startTunnel({
				//		port:                   openPort.port,
				//		acceptCloudflareNotice: true,
				//	})
				//
				//	if (tunnel) {
				//		logger.verbose(`🚇 Tunnel is enabled, you can access your application via public URL: ${await tunnel.getURL()}`)
				//	}
				//}

			})
			isApplicationListening = true
		} catch (e) {
			logger.error(`Error while trying to start application: ${(
				e as unknown as any
			).message}`)
			await delay(retryDelay)
			openPort   = await portAllocator(PORT)
			retryDelay = retryDelay * 2
		}

		if (retryCount === 0) {
			logger.error(`Application failed to start after ${retryCount} attempts`)
			process.exit(1)
		}

		retryCount--
	}

	await migrateDatabase()

	return app
}