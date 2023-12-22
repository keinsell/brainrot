import {Module}                  from "@nestjs/common"
import {prismaLoggingMiddleware} from "../prisma/middleware/prisma-logging-middleware.js"
import {PrismaModule}            from "../prisma/prisma-module.js"



@Module({
	imports:     [
		PrismaModule.forRoot({
			prismaServiceOptions: {
				middlewares: [prismaLoggingMiddleware()],
			},
		}),
	],
	controllers: [],
	providers:   [],
	exports:     [PrismaModule],
})
export class DatabaseModule {}