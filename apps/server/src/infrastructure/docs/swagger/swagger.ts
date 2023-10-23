import {INestApplication, Logger}       from "@nestjs/common"
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"
import fs                               from "node:fs"
import process                          from 'node:process'
import {SwaggerTheme}                   from "swagger-themes"
import {ApplicationConfiguration}       from "../../../configs/application-configuration.js"
import {env}                            from "../../../configs/env.js"



export async function buildSwaggerDocumentation(app: INestApplication): Promise<void> {
	const logger = new Logger('doc:swagger');

	const config = new DocumentBuilder()
	.setTitle(env.SERVICE_NAME as string)
	.setDescription(env.SERVICE_DESCRIPTION as string)
	.setVersion('1.0')
	.addTag('api')
	.build()

	logger.verbose(`Swagger documentation base built for ${env.SERVICE_NAME} service. ${JSON.stringify(config)}`);

	const document = SwaggerModule.createDocument(app, config);

	logger.verbose(`Swagger documentation document built for ${env.SERVICE_NAME} service. ${JSON.stringify(document)}`);

	SwaggerModule.setup(ApplicationConfiguration.openapiDocumentationPath, app, document, {
		explorer:  true,
		customCss: new SwaggerTheme('v3').getBuffer("flattop"), // OR newspaper
	});

	logger.log(`Swagger documentation was attached to ${env.SERVICE_NAME} service at ${ApplicationConfiguration.openapiDocumentationPath}`);

	// Save Swagger Documentation to File
	fs.writeFileSync('./openapi3.json', JSON.stringify(document));
	logger.verbose(`Swagger documentation was snapshot into ${process.cwd()}/swagger.json`);
}