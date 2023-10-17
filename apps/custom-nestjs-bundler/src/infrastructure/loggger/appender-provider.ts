import {Provider}      from "@nestjs/common"
import {ConfigService} from '@nestjs/config';
import {LogAppender}   from "./log-appender.ts"



export const AppenderProviderToken = 'LoggerAppenders';
export const AppenderProvider: Provider = {
	provide   : AppenderProviderToken,
	useFactory: (configService: ConfigService): LogAppender[] => {
		const appenders: LogAppender[] = [];
		//if (configService.get('FLUENTD_CONFIG')) {
		//	appenders.push(new FluentDAppender());
		//}
		// ... add other appenders based on config
		return appenders;
	},
	inject    : [ConfigService],
};