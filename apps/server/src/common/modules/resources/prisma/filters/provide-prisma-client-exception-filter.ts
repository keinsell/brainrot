import {APP_FILTER, HttpAdapterHost}   from "@nestjs/core"
import {PrismaErrorCodesStatusMapping} from "../structures/prisma-error-codes-status-mapping.js"
import {PrismaClientExceptionFilter}   from "./prisma-client-exception-filter.js"



export function providePrismaClientExceptionFilter(errorCodesStatusMapping?: PrismaErrorCodesStatusMapping) {
	return {
		provide:    APP_FILTER,
		useFactory: ({httpAdapter}: HttpAdapterHost) => {
			return new PrismaClientExceptionFilter(httpAdapter, errorCodesStatusMapping);
		},
		inject:     [HttpAdapterHost],
	};
}