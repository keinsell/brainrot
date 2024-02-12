import {Module}                 from "@nestjs/common"
import {CombinedLogger, Logger} from "./logger.js"
import {InternalLoggerAdapter}  from "./nestjs-logger-proxy.js"



@Module({
	providers: [
		{
			provide:  Logger,
			useClass: CombinedLogger,
		}, {
			provide:  "LoggerService",
			useValue: new InternalLoggerAdapter(),
		},
	],
	exports:   [Logger, "LoggerService"],
})
export class LoggerModule {}