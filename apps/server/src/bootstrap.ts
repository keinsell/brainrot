import {Logger}                from "@nestjs/common"
import {NestFactory}           from "@nestjs/core"
import delay                   from "delay"
import ms                      from "ms"
import {env, HEALTHCHECK_PATH} from "./configs/env.js"
import {Container}             from "./container.js"
import {portAllocator}         from "./utilities/port-allocator.js"



export async function bootstrap() {
	const app = await NestFactory.create(Container);

	// Implement logger used for bootstrapping and notifying about application state
	const logger = new Logger("Bootstrap");

	app.enableShutdownHooks()

	// Listen on selected application port (with grace)
	const openPortForAllocation = await portAllocator(env.PORT as number);

	if (openPortForAllocation.wasReplaced) {
		logger.warn(
			`Application performed port availability check and ::${env.PORT} is not available, found a new shiny ::${openPortForAllocation.port} instead. If you believe this is a mistake, please check your environment variables and processes that are running on your machine.`,
		);
	} else {
		logger.log(
			`Application performed port availability check and ::${env.PORT} is available`,
		);
	}

	let isApplicationListening = false;
	let retryDelay = ms("5s");
	let retryCount = 3

	const applicationUrl = `${env.PROTOCOL}://${env.HOST}:${openPortForAllocation.port}`

	while (!isApplicationListening) {
		try {
			await app.listen(openPortForAllocation.port, () => {
				logger.log(
					`Application started on ${applicationUrl} in ${env.NODE_ENV} mode`,
				);
				logger.log(
					`Healthcheck endpoint: ${applicationUrl + HEALTHCHECK_PATH}`,
				)
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

		if (retryCount === 0) {
			logger.error(
				`Application failed to start after ${retryCount} attempts`,
			);
			process.exit(1);
		}

		retryCount--;
	}
}

