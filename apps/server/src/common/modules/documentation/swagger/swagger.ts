import {INestApplication, Logger}                      from "@nestjs/common"
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger"
import fs                                              from "node:fs"
import process                                         from 'node:process'
import tildify                                         from "tildify"
import {ApplicationConfiguration}                      from "../../../../configs/application-configuration.js"
import {getMetadataStore}                              from "../../../../utilities/docs-utils/swagger-api-model.js"
import {config}                                        from "../../../../configs/service/configuration-service.js";



/**
 * Experimental method to add API model functionality to the OpenAPI document.
 *
 * @param {OpenAPIObject} document - The OpenAPI document to add model functionality to.
 * @return {void}
 */
function experimentalAddApiModelFunctionality(document : OpenAPIObject) : void {
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
	const updateSchema = (schema : any) => {
		if (schema?.$ref) {
			const refArray     = schema.$ref.split('/');
			const originalName = refArray.pop();
			const metatype     = modelMetadataStore[originalName];

			if (metatype?.name) {
				refArray.push(metatype.name);
				schema.$ref = refArray.join('/');
			}
		}
	};

	// Update Swagger Paths
	for (const pathKey in document.paths) {
		for (const methodKey in document.paths[pathKey]) {
			const operation = document.paths[pathKey][methodKey];

			if (operation?.parameters) {
				for (const param of operation.parameters) {
					updateSchema(param.schema); // references under parameters can be updated
				}
			}

			if (operation?.requestBody?.content) {
				for (const mediaTypeKey in operation.requestBody.content) {
					const schema = operation.requestBody.content[mediaTypeKey].schema;
					updateSchema(schema); // references under request bodies can be updated
				}
			}

			if (operation?.responses) {
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


export async function buildSwaggerDocumentation(app : INestApplication) : Promise<void> {
	const logger = new Logger('doc:swagger');

	const swaggerConfig = new DocumentBuilder()
	.setTitle(config.get('SERVICE_NAME'))
	.setDescription(config.get('SERVICE_DESCRIPTION'))
	.setVersion('1.0')
	.addTag('api')
	.build()

	logger.verbose(`Swagger documentation base built for ${config.get('SERVICE_NAME')} service.`);

	const document = SwaggerModule.createDocument(app, swaggerConfig);

	logger.verbose(`Swagger documentation document built for ${config.get('SERVICE_NAME')} service.`);

	experimentalAddApiModelFunctionality(document);

	//SwaggerModule.setup(ApplicationConfiguration.openapiDocumentationPath, app, document, {
	//	explorer:  true,
	//	customCss: new SwaggerTheme('v3').getBuffer("flattop"), // OR newspaper
	//});

	//app.use("/api", apiReference({
	//	spec: {
	//		content: document,
	//	},
	//}))

	logger.verbose(`Swagger documentation was attached to ${config.get('SERVICE_NAME')} service at ${ApplicationConfiguration.openapiDocumentationPath}`);

	const documentationObjectPath = `${process.cwd()}/src/common/modules/documentation/swagger/public/api/openapi3.json`;

	// Save Swagger Documentation to File
	fs.writeFileSync(
		documentationObjectPath,
		JSON.stringify(document),
	);

	logger.verbose(`Swagger documentation was snapshot into ${tildify(documentationObjectPath)}`);
}