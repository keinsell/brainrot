import {INestApplication, Logger}                      from "@nestjs/common"
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger"
import fs                                              from "node:fs"
import process                                         from 'node:process'
import {SwaggerTheme}                                  from "swagger-themes"
import tildify                                         from "tildify"
import {ApplicationConfiguration}                      from "../../../../configs/application-configuration.js"
import {env}                                           from "../../../../configs/env.js"
import {getMetadataStore}                              from "../../../../utilities/docs-utils/swagger-api-model.js"



/**
 * Experimental method to add API model functionality to the OpenAPI document.
 *
 * @param {OpenAPIObject} document - The OpenAPI document to add model functionality to.
 * @return {void}
 */
function experimentalAddApiModelFunctionality(document: OpenAPIObject): void {
	// ExperimentalL: Force OpenAPI Model Documentation

	const modelMetadataStore = getMetadataStore();

	if (document.components) {
		for (const definitionKey in document.components.schemas) {
			const metatype = modelMetadataStore[definitionKey];

			if (metatype) {
				if (metatype.name) {
					document.components.schemas[metatype.name] = document.components.schemas[definitionKey];
					delete document.components.schemas[definitionKey];
				}

				if (metatype.description) {
					(
						document.components.schemas[metatype.name ?? definitionKey] as any
					).description = metatype.description;
				}
			}
		}
	}

	// Experimental
	const updateSchema = (schema: any) => {
		if (schema && schema.$ref) {
			const refArray     = schema.$ref.split('/');
			const originalName = refArray.pop();
			const metatype     = modelMetadataStore[originalName];

			if (metatype && metatype.name) {
				refArray.push(metatype.name);
				schema.$ref = refArray.join('/');
			}
		}
	};

	// Update Swagger Paths
	for (const pathKey in document.paths) {
		for (const methodKey in document.paths[pathKey]) {
			const operation = document.paths[pathKey][methodKey];

			if (operation && operation.parameters) {
				for (const param of operation.parameters) {
					updateSchema(param.schema); // references under parameters can be updated
				}
			}

			if (operation && operation.requestBody && operation.requestBody.content) {
				for (const mediaTypeKey in operation.requestBody.content) {
					const schema = operation.requestBody.content[mediaTypeKey].schema;
					updateSchema(schema); // references under request bodies can be updated
				}
			}

			if (operation && operation.responses) {
				for (const responseKey in operation.responses) {
					const contentType = operation.responses[responseKey]?.content;

					for (const mediaTypeKey in contentType) {
						const schema = contentType[mediaTypeKey].schema;
						updateSchema(schema); // references under responses can be updated.
					}
				}
			}
		}
	}
}


export async function buildSwaggerDocumentation(app: INestApplication): Promise<void> {
	const logger = new Logger('doc:swagger');

	const config = new DocumentBuilder()
	.setTitle(env.SERVICE_NAME as string)
	.setDescription(env.SERVICE_DESCRIPTION as string)
	.setVersion('1.0')
	.addTag('api')
	.build()

	logger.verbose(`Swagger documentation base built for ${env.SERVICE_NAME} service.`);

	const document = SwaggerModule.createDocument(app, config);

	logger.verbose(`Swagger documentation document built for ${env.SERVICE_NAME} service.`);

	experimentalAddApiModelFunctionality(document);

	SwaggerModule.setup(ApplicationConfiguration.openapiDocumentationPath, app, document, {
		explorer:  true,
		customCss: new SwaggerTheme('v3').getBuffer("flattop"), // OR newspaper
	});

	logger.verbose(`Swagger documentation was attached to ${env.SERVICE_NAME} service at ${ApplicationConfiguration.openapiDocumentationPath}`);

	const documentationObjectPath = `${process.cwd()}/openapi3.json`;

	// Save Swagger Documentation to File
	fs.writeFileSync('./openapi3.json', JSON.stringify(document));
	logger.verbose(`Swagger documentation was snapshot into ${tildify(documentationObjectPath)}`);
}