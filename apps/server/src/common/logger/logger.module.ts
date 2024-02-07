import {Module}                 from "@nestjs/common"
import {CombinedLogger, Logger} from "./logger.js"
import {NestjsLogger}           from "./nestjs-logger-proxy.js"



@Module({
	providers: [
		{
			provide:  Logger,
			useClass: CombinedLogger,
		}, {
			provide:  "LoggerService",
			useValue: new NestjsLogger(),
		},
	],
	exports:   [Logger, "LoggerService"],
})
export class LoggerModule {}