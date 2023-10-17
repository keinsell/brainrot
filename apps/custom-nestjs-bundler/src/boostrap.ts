import {faker}                  from "@faker-js/faker";
import {Logger, ValidationPipe} from "@nestjs/common";
import {NestFactory}            from "@nestjs/core";
import delay                    from "delay";
import ms                       from "ms";
import "reflect-metadata";
import {env}                    from "../../server/src/configs/env.js";
import {Container}              from "./container.ts";
import {AccountService}         from "./modules/account/account-service.js";
import {portFinder}             from "./utilities/port-finder.ts";



export async function bootstrap() {
	// Contract application from Nest.js dependency injection container
	const app = await NestFactory.create(Container, {
		/** If enabled, logs will be buffered until the "Logger#flush" method is called. */
		bufferLogs   : true,
		abortOnError : true,
		autoFlushLogs: true,
		preview      : false,
		snapshot     : true,
	});

	// Implement logger used for bootstrapping and notifying about application state
	const logger = new Logger("BootstrapProcess");

	// Add application-wide validation pipe
	app.useGlobalPipes(new ValidationPipe({transform: true}));

	// Try to create a new account
	const accountService = await app.get(AccountService);

	logger.log("Creating a new account for testing purposes...");
	console.log(accountService);

	try {
		await accountService.register(
			faker.internet.email(),
			faker.internet.password(),
		);
	} catch (e) {
		logger.error(
			`Error while trying to create a new account: ${
				(
					e as unknown as any
				).message
			}`,
		);
	}

	// Add lifecycle hooks
	app.enableShutdownHooks();

	// Listen on selected application port (with grace)
	const FOUND_PORT = await portFinder(env.PORT as number);

	if (FOUND_PORT.isPortChanged) {
		logger.warn(
			`Application performed port availability check and ::${process.env.PORT} is not available, found a new shiny ::${FOUND_PORT.port} instead. If you believe this is a mistake, please check your environment variables and processes that are running on your machine.`,
		);
	}

	let isApplicationListening = false;
	let retryDelay = ms("5s");

	while (!isApplicationListening) {
		try {
			await app.listen(FOUND_PORT.port, () => {
				logger.log(
					`Application started on ${env.PROTOCOL}://${env.HOST}:${FOUND_PORT.port}/account in ${env.NODE_ENV} mode`,
				);
			});
			isApplicationListening = true;
		} catch (e) {
			logger.error(
				`Error while trying to start application: ${
					(
						e as unknown as any
					).message
				}`,
			);
			await delay(retryDelay);
			retryDelay = retryDelay * 2;
		}
	}
}
