import {Logger}                       from "@nestjs/common"
import {HttpAdapterHost, NestFactory} from "@nestjs/core"
import delay                          from "delay"
import ms                             from "ms"
import process                        from "node:process"
import {seeder}                       from "./common/libraries/seeder/seeder.js"
import {buildCompodocDocumentation}   from "./common/modules/documentation/compodoc/compodoc.js"
import {buildSwaggerDocumentation}    from "./common/modules/documentation/swagger/swagger.js"
import {DatabaseModule}               from "./common/modules/database/database.module.js"
import {StaticFeatureFlags}           from "./configs/static-feature-flags.js"
import {Container}                    from "./container.js"
import {AccountModule}                from "./modules/account/account.module.js"
import {AccountSeeder}                from "./modules/account/repositories/account-seeder.js"
import {CartSeeder}                   from "./modules/todo_cart/cart-seeder.js"
import {ProductSeeder}                from "./modules/todo_product/product-seeder.js"
import {ProfileSeeder}                from "./modules/todo_profile/infrastructure/profile-seeder.js"
import {portAllocator}                from "./utilities/network-utils/port-allocator.js"
import {RoleSeeder}                   from "./modules/role/seeder/role-seeder.js";
import Sentry                         from "@sentry/node";
import {
	PrismaClientExceptionFilter,
}                                     from "./common/modules/resources/prisma/filters/prisma-client-exception-filter.js";
import {
	executePrismaRelatedProcesses,
}                                     from "./common/modules/resources/prisma/utils/execute-prisma-related-processes.js";
import {__appConfig, __config}        from "./configs/global/__config.js";
import {isDevelopment}                from "./configs/helper/is-development.js";



export async function bootstrap() {
	const app = await NestFactory.create(Container, {
		abortOnError : false,
		autoFlushLogs: true,
		bufferLogs   : true,
		snapshot     : isDevelopment(),
	});

	// Enable Prisma Exception Filter for Http Service
	const {httpAdapter} = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

	// Implement logger used for bootstrapping and notifying about application state
	const logger = new Logger("Bootstrap");

	await executePrismaRelatedProcesses()

	Sentry.addIntegration(new Sentry.Integrations.Http({tracing: true, breadcrumbs: true}));
	Sentry.addIntegration(new Sentry.Integrations.Express({app: app.getHttpAdapter().getInstance()}))

	// Enable graceful shutdown hooks
	app.enableShutdownHooks()

	// Build swagger documentation
	await buildSwaggerDocumentation(app);
	buildCompodocDocumentation()

	// The error handler must be before any other error middleware and after all controllers
	app.use(Sentry.Handlers.errorHandler());

	// Optional fallthrough error handler
	app.use(function onError(err, req, res, next) {
		res.statusCode = 500;
		res.end(res.sentry + "\n");
	});

	const PORT = __config.get("PORT")

	// Listen on selected application port (with grace)
	let openPort = await portAllocator(PORT);

	if (openPort.wasReplaced) {
		logger.warn(`Application performed port availability check and ::${PORT} is not available, found a new shiny ::${openPort.port} instead. If you believe this is a mistake, please check your environment variables and processes that are running on your machine.`);
	}
	else {
		logger.log(`Port availability check succeeded and requested ::${PORT} is available`);
	}

	let isApplicationListening = false;
	let retryDelay             = ms("5s");
	let retryCount             = 3

	const PROTOCOL = __config.get("PROTOCOL")
	const HOST     = __config.get("HOST")
	const NODE_ENV = __config.get("NODE_ENV")

	const applicationUrl = `${PROTOCOL}://${HOST}:${openPort.port}`

	while (!isApplicationListening) {
		try {
			await app.listen(openPort.port, () => {
				logger.debug(`${"-".repeat(54)}`)
				logger.log(`🚀 Application started on ${applicationUrl} in ${NODE_ENV} mode`);
				logger.debug(`${"-".repeat(54)}`)
				logger.debug(`📄 Compodoc endpoint: ${applicationUrl + '/docs'}`)
				logger.debug(`📄 Swagger endpoint: ${applicationUrl + '/api'}`)
				logger.debug(`🩺 Healthcheck endpoint: ${applicationUrl
				                                        + __config.get("APPLICATION").HEALTHCHECK_ENDPOINT}`)

				if (isDevelopment() && StaticFeatureFlags.shouldRunPrismaStudio) {
					logger.debug(`🧩 Prisma Admin is running on: http://localhost:${__appConfig.PRISMA_ADMIN_PORT}`)
				}

				logger.debug(`${"-".repeat(54)}`)
			});
			isApplicationListening = true;
		}
		catch (e) {
			logger.error(`Error while trying to start application: ${(
				e as unknown as any
			).message}`);
			await delay(retryDelay);
			openPort   = await portAllocator(PORT);
			retryDelay = retryDelay * 2;
		}

		if (retryCount === 0) {
			logger.error(`Application failed to start after ${retryCount} attempts`);
			process.exit(1);
		}

		retryCount--;
	}

	// If application is running in development mode, try to seed the database
	if (isDevelopment() && __config.get("APPLICATION").RUN_SEED) {
		try {
			seeder({
				imports  : [
					DatabaseModule,
					AccountModule,
				],
				providers: [
					ProductSeeder,
					AccountSeeder,
					ProfileSeeder,
					RoleSeeder,
				],
			})
			.run([
				ProductSeeder,
				AccountSeeder,
				ProfileSeeder,
				CartSeeder,
				RoleSeeder,
			]);
		}
		catch (e) {
			logger.error(`Error while trying to seed database: ${(
				e as unknown as any
			).message}`);
		}
	}

	return app;
}