import {LogAppender} from "./log-appender.ts"
import {LogEvent}    from "./log-event.ts"
import {LogLevel}    from "./log-level.ts"



abstract class Logger {
	private appenders: LogAppender[] = [];

	private level: LogLevel = LogLevel.INFO;

	constructor(appenders?: LogAppender[], level?: LogLevel) {
		if (level) {
			this.level = level;
		}
	}

	// Add an appender
	addAppender(appender: LogAppender) {
		this.appenders.push(appender);
	}

	// Abstract method for formatting messages
	abstract formatMessage(message: string, args: any[]): string;

	// Log methods
	debug(message: string, ...args: any[]) {
		this.log(LogLevel.DEBUG, message, ...args);
	}

	info(message: string, ...args: any[]) {
		this.log(LogLevel.INFO, message, ...args);
	}

	warn(message: string, ...args: any[]) {
		this.log(LogLevel.WARN, message, ...args);
	}

	error(message: string, ...args: any[]) {
		this.log(LogLevel.ERROR, message, ...args);
	}

	fatal(message: string, ...args: any[]) {
		this.log(LogLevel.FATAL, message, ...args);
	}

	// Core log method
	private log(level: LogLevel, message: string, ...args: any[]) {
		if (level >= this.level) {
			const formattedMessage = this.formatMessage(message, args);
			const logEvent = new LogEvent(new Date(), level, formattedMessage);

			for (const appender of this.appenders) {
				appender.append(logEvent);
			}
		}
	}
}


// Example console appender
class ConsoleAppender
	implements LogAppender {
	append(logEvent: LogEvent) {
		console.log(`[${logEvent.timestamp.toISOString()}] [${LogLevel[logEvent.level]}] ${logEvent.message}`);
	}
}


// Concrete Logger implementation
class MyLogger
	extends Logger {
	formatMessage(message: string, args: any[]): string {
		return message.replace(/{(\d+)}/g, (match, number) => {
			return typeof args[number] !== "undefined" ? args[number] : match;
		});
	}
}


// Usage
const logger = new MyLogger();
logger.addAppender(new ConsoleAppender());
logger.info("Hello, {0}!", "World");
