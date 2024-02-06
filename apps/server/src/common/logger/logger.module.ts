import {Module}                 from "@nestjs/common"
import {CombinedLogger, Logger} from "./logger.js"



@Module({
	providers: [
		{
			provide:  Logger,
			useClass: CombinedLogger,
		},
	],
	exports:   [Logger],
})
export class LoggerModule {}