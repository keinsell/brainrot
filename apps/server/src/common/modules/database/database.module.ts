import {Module} from "@nestjs/common"
import {PrismaModule} from "../resources/prisma/prisma-module.js";
import {prismaLoggingMiddleware} from "../resources/prisma/middleware/prisma-logging-middleware.js";



@Module({
	imports    : [
		PrismaModule.forRoot({
			prismaServiceOptions: {
				middlewares: [prismaLoggingMiddleware()],
			},
		}),
	],
	controllers: [],
	providers  : [],
	exports    : [PrismaModule],
})
export class DatabaseModule {}