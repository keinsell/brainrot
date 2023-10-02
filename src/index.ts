import {fakerEN}        from "@faker-js/faker"
import {NestFactory}    from "@nestjs/core";
import {MainModule}     from "./main-module.ts";
import {AccountService} from "./modules/account/account-service.ts"

export async function bootstrap() {
	const app = await NestFactory.create(MainModule, {
		bufferLogs: true,
	});

	const register = app.get<AccountService>(AccountService);


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


	await app.listen(3000);

	await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	await register.register(fakerEN.internet.email(), fakerEN.internet.password());
	await register.register(fakerEN.internet.email(), fakerEN.internet.password());
}
