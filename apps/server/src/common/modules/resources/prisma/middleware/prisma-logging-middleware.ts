import {Logger}                   from "@nestjs/common"
import {Prisma}                   from "../../../../../vendor/prisma/index.js"
import {LoggingMiddlewareOptions} from "../structures/prisma-logging-middleware-options.js"



export function prismaLoggingMiddleware({
	logger,
	logMessage,
	logLevel,
}: LoggingMiddlewareOptions = {
	logger:   console,
	logLevel: 'debug',
}): Prisma.Middleware {
	return async (params, next) => {
		const before = Date.now();

		const result = await next(params);

		const after = Date.now();

		const executionTime = after - before;

		const nestLogger = new Logger("prisma")

		nestLogger.verbose(`Prisma query: ${params.model}.${params.action}() in ${executionTime}ms`)
		nestLogger.verbose(`Prisma query: ${params.args}`)

		return result;
	};
}