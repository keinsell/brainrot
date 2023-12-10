import {Logger}                        from "@nestjs/common"
import {NestFactory}                   from "@nestjs/core"
import delay                           from "delay"
import ms                              from "ms"
import process                         from "node:process"
import {buildCompodocDocumentation}    from "./common/infrastructure/documentation/compodoc/compodoc.js"
import {buildSwaggerDocumentation}     from "./common/infrastructure/documentation/swagger/swagger.js"
import {executePrismaRelatedProcesses} from "./common/infrastructure/storage/database/adapters/prisma/execute-prisma-related-processes.js"
import {DatabaseModule}                from "./common/infrastructure/storage/database/database.module.js"
import {seeder}                        from "./common/libraries/seeder/seeder.js"
import {ApplicationConfiguration}      from "./configs/application-configuration.js"
import {env}                           from "./configs/env.js"
import {StaticFeatureFlags}            from "./configs/static-feature-flags.js"
import {Container}                     from "./container.js"
import {AccountSeeder}                 from "./modules/account/persistence/account-seeder.js"
import {AccountModule}                 from "./modules/account/account.module.js"
import {CartSeeder}                    from "./modules/cart/cart-seeder.js"
import {ProductSeeder}                 from "./modules/product/product-seeder.js"
import {ProfileSeeder}                 from "./modules/profile/infrastructure/profile-seeder.js"
import {portAllocator}                 from "./utilities/network-utils/port-allocator.js"



export async function bootstrap() {
	const app = await NestFactory.create(Container, {
		abortOnError: false,
		snapshot:     !!env.isDev,
	});

	// Implement logger used for bootstrapping and notifying about application state
	const logger = new Logger("Bootstrap");

	await executePrismaRelatedProcesses()

	// Enable graceful shutdown hooks
	app.enableShutdownHooks()

	// Build swagger documentation
	await buildSwaggerDocumentation(app);
	buildCompodocDocumentation()

	//	app.connectMicroservice<MicroserviceOptions>({
	//		transport: Transport.NATS,
	//		options:   {
	//			url: 'nats://localhost:4222',
	//		},
	//	});
	//
	//	await app.startAllMicroservices();

	// Listen on selected application port (with grace)
	let openPortForAllocation = await portAllocator(env.PORT as number);

	if (openPortForAllocation.wasReplaced) {
		logger.warn(`Application performed port availability check and ::${env.PORT} is not available, found a new shiny ::${openPortForAllocation.port} instead. If you believe this is a mistake, please check your environment variables and processes that are running on your machine.`);
	}
	else {
		logger.log(`Port availability check succeeded and requested ::${env.PORT} is available`);
	}

	let isApplicationListening = false;
	let retryDelay             = ms("5s");
	let retryCount             = 3

	const applicationUrl = `${env.PROTOCOL}://${env.HOST}:${openPortForAllocation.port}`

	while (!isApplicationListening) {
		try {
			await app.listen(openPortForAllocation.port, () => {
				logger.debug(`${"-".repeat(54)}`)
				logger.log(`🚀 Application started on ${applicationUrl} in ${env.NODE_ENV} mode`);
				logger.debug(`${"-".repeat(54)}`)
				logger.debug(`📄 Compodoc endpoint: ${applicationUrl + '/docs'}`)
				logger.debug(`📄 Swagger endpoint: ${applicationUrl + '/api'}`)
				logger.debug(`🩺 Healthcheck endpoint: ${applicationUrl + ApplicationConfiguration.healthCheckPath}`)

				if (env.isDev && StaticFeatureFlags.shouldRunPrismaStudio) {
					logger.debug(`🧩 Prisma Admin is running on: http://localhost:${ApplicationConfiguration.prismaAdminPort}`)
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
			openPortForAllocation = await portAllocator(env.PORT as number);
			retryDelay            = retryDelay * 2;
		}

		if (retryCount === 0) {
			logger.error(`Application failed to start after ${retryCount} attempts`);
			process.exit(1);
		}

		retryCount--;
	}

	// If application is running in development mode, try to seed the database
	if (env.isDev && StaticFeatureFlags.shouldRunSeeder) {
		try {
			seeder({
				imports:   [
					DatabaseModule, AccountModule,
				],
				providers: [
					ProductSeeder, AccountSeeder, ProfileSeeder,
				],
			}).run([ProductSeeder, AccountSeeder, ProfileSeeder, CartSeeder]);
		}
		catch (e) {
			logger.error(`Error while trying to seed database: ${(
				e as unknown as any
			).message}`);
		}
	}

	return app;
}