import {Logger, ValidationPipe} from "@nestjs/common";
import {NestFactory}            from "@nestjs/core";
import delay                    from "delay";
import ms                       from "ms";
import {Container}              from "./container.ts";
import {portFinder}             from "./utilities/port-finder.ts";

export async function bootstrap() {
	// Contract application from Nest.js dependency injection container
	const app = await NestFactory.create(Container, {
		bufferLogs: true,
	});

	// Implement logger used for bootstrapping and notifying about application state
	const logger = new Logger("BootstrapProcess");

	// Add application-wide validation pipe
	app.useGlobalPipes(new ValidationPipe({transform: true}));

	// Add lifecycle hooks
	app.enableShutdownHooks();

	// Listen on selected application port (with grace)
	const FOUND_PORT = await portFinder(
		process.env.PORT ? parseInt(process.env.PORT) : undefined,
	);

	if (FOUND_PORT.isPortChanged) {
		logger.warn(
			`Port ${process.env.PORT} is not available, using ${FOUND_PORT.port} instead.`,
		);
	}

	let isApplicationListening = false;
	let retryDelay = ms("5s");

	while (!isApplicationListening) {
		try {
			await app.listen(FOUND_PORT.port, () => {
				logger.log(
					`Application started on ${process.env["PROTOCOL"] ?? "http"}://${
						process.env["HOST"] ?? "localhost"
					}:${FOUND_PORT.port}/account in ${
						process.env["NODE_ENV"] ?? "development"
					} mode`,
				);
			});
			isApplicationListening = true;
		}
		catch (e) {
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
