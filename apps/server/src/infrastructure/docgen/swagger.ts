import {INestApplication, Logger}       from "@nestjs/common"
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"
import {SwaggerTheme}                   from "swagger-themes"
import {env}                            from "../../configs/env.js"



export async function buildSwaggerDocumentation(app: INestApplication): Promise<void> {
	const logger = new Logger('doc:swagger');

	const config = new DocumentBuilder()
	.setTitle(env.SERVICE_NAME)
	.setDescription(env.SERVICE_DESCRIPTION)
	.setVersion('1.0')
	.addTag('api')
	.build()

	logger.verbose(`Swagger documentation base built for ${env.SERVICE_NAME} service. ${JSON.stringify(config)}`);

	const document = SwaggerModule.createDocument(app, config);

	logger.verbose(`Swagger documentation document built for ${env.SERVICE_NAME} service. ${JSON.stringify(document)}`);

	SwaggerModule.setup('api', app, document, {
		explorer:  true,
		customCss: new SwaggerTheme('v3').getBuffer("flattop"), // OR newspaper
	});

	logger.log(`Swagger documentation was attached to ${env.SERVICE_NAME} service at /api`);

	// Save Swagger Documentation to File

	const fs = await import('fs');
	fs.writeFileSync('./openapi3.json', JSON.stringify(document));

	logger.verbose(`Swagger documentation was snap hotted into ${process.cwd()}/swagger.json`);
}