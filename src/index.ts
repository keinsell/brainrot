import {Logger}         from "@nestjs/common"
import {NestFactory}    from "@nestjs/core";
import delay            from "delay"
import ms               from "ms"
import {MainModule}     from "./main-module.ts";
import {AccountService} from "./modules/account/account-service.ts"

export async function bootstrap() {
	const app = await NestFactory.create(MainModule, {
		bufferLogs: true,
	});

	const register = app.get<AccountService>(AccountService);

	const logger = new Logger("BootstrapProcess")

	// Add Middleware
	//app.use(json({limit: '16mb'}));
	//app.useGlobalPipes(new ValidationPipe());

	//const options = new DocumentBuilder().build();
	//
	//const document = SwaggerModule.createDocument(app, options);
	//SwaggerModule.setup('docs', app, document);
	//
	//app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

	app.enableShutdownHooks();

	// TODO: Wait for port to be free do not crash application

	let isApplicationListening = false;
	let retryDelay = ms("5s")

	while (!isApplicationListening) {
		try {
			await app.listen(3000, () => {
				logger.log(`Application listening on port 3000`);
			});
			isApplicationListening = true;
		}
		catch (e) {
			logger.error(`Error while trying to start application: ${e.message}`);
			await delay(retryDelay);
			retryDelay = retryDelay * 2
		}
	}


	//await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	//await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	//await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	//await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	//await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	//await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	//await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	//await register.register(fakerEN.internet.email(), fakerEN.internet.password());
}
