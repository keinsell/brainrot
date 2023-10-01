import {NestFactory} from '@nestjs/core';
import {MainModule}  from "./main-module.ts"

async function bootstrap() {
	const app = await NestFactory.create(MainModule);

	//const options = new DocumentBuilder().build();
	//
	//const document = SwaggerModule.createDocument(app, options);
	//SwaggerModule.setup('docs', app, document);
	//
	//app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

	app.enableShutdownHooks();

	await app.listen(3000);
}

await bootstrap();
