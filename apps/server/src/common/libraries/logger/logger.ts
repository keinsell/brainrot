import {FileAppender, LogAppender} from "./log-appender.js"
import {LogLevel}                  from "./log-level.js"
import {Log}                       from "./log.js"


// Disquisition Async Logger with Sync Loggers

export class ExperimentalLogger {
	private _appenders: LogAppender[] = [];


	constructor(config: {
		appends: LogAppender[]
	}) {
		for (const appender of config.appends) {
			this.registerAppender(appender);
		}
	}


	log(message?: any) {
		this.distributeLog(new Log({
			level:   LogLevel.INFO,
			message: message,
		}));
	}


	protected distributeLog(log: Log) {
		this._appenders.forEach(appender => appender.append(log));
	}


	protected registerAppender(appender: LogAppender) {
		this._appenders.push(appender);
	}
}


export class ConsoleAppender extends LogAppender {
	append(log: Log) {
		switch (log.level) {
			case LogLevel.INFO:
				console.info(log.message);
				break;
			case LogLevel.WARN:
				console.warn(log.message);
				break;
			case LogLevel.ERROR:
				console.error(log.message);
				break;
			case LogLevel.DEBUG:
				console.debug(log.message);
				break;
			case LogLevel.TRACE:
				console.trace(log.message);
				break;
		}
	}
}


export const experimentalLogger = new ExperimentalLogger({
	appends: [
		new ConsoleAppender(), new FileAppender("logs/today.log"),
	],
});