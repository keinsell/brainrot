import chalk         from 'chalk';
import {LogAppender} from "../log-appender.js"
import {LogLevel}    from "../log-level.js"
import {Log}         from "../log.js"



export class ConsoleAppender extends LogAppender {
	private static getColorForLogLevel(logLevel: LogLevel): string {
		switch (logLevel) {
			case LogLevel.TRACE:
			case LogLevel.DEBUG:
				return 'gray';
			case LogLevel.INFO:
				return 'green';
			case LogLevel.WARN:
				return 'yellow';
			case LogLevel.ERROR:
			case LogLevel.FATAL:
				return 'red';
			default:
				return 'white';
		}
	}


	append(log: Log): void {
		const level   = log.level.toUpperCase();
		const color   = ConsoleAppender.getColorForLogLevel(log.level);
		const message = (
			chalk as any
		)[color](`${log.timestamp}: ${log.message}`);

		switch (log.level) {
			case LogLevel.TRACE:
				console.log(`${chalk.gray('TRACE')}`, message);
				break;
			case LogLevel.DEBUG:
				console.log(`${chalk.gray('DEBUG')}`, message);
				break;
			case LogLevel.INFO:
				console.log(message);
				break;
			case LogLevel.WARN:
				console.warn(message);
				break;
			case LogLevel.ERROR:
				console.error(message);
				break;
			case LogLevel.FATAL:
				console.error(message);
				break;
			default:
				console.log(message);
				break;
		}
	}
}