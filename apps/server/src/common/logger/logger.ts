import {Injectable}      from "@nestjs/common"
import {nanoid}          from "nanoid"
import {ConsoleAppender} from "./appender/console-appender.js"
import {FileAppender}    from "./appender/file-appender.js"
import {LogAppender}     from "./log-appender.js"
import {LogLevel}        from "./log-level.js"
import {Log}             from "./log.js"



export type LogMetadataKey = "requestId" | "correlationId" | "error" | "error-message" | "context" | "data" | string
export type LogMetadata = Record<LogMetadataKey, any> | undefined;


export class Logger {
	private context: LogMetadata           = {context: 'default'};
	private logAppenderList: LogAppender[] = [];


	protected constructor(context?: LogMetadata, logAppenderList?: LogAppender[]) {
		if (context) {
			this.context = {
				context: context.context,
			}
		}

		if (logAppenderList) {
			this.logAppenderList = logAppenderList;
		}
	}


	info(message: string, ...meta: LogMetadata[]): void {
		this.log({
			id:        this.generateLogId(),
			timestamp: new Date(),
			level:     LogLevel.INFO,
			message,
			metadata:  {...this.context, ...meta},
		});
	}


	warn(message: string, ...meta: LogMetadata[]): void {
		this.log({
			id:        this.generateLogId(),
			timestamp: new Date(),
			level:     LogLevel.WARN,
			message,
			metadata:  {...meta, ...this.context},
		});
	}


	error(message: string, ...meta: LogMetadata[]): void {
		this.log({
			id:        this.generateLogId(),
			timestamp: new Date(),
			level:     LogLevel.ERROR,
			message,
			metadata:  {...meta, ...this.context},
		});
	}


	fatal(message: string, ...meta: LogMetadata[]): void {
		this.log({
			id:        this.generateLogId(),
			timestamp: new Date(),
			level:     LogLevel.FATAL,
			message,
			metadata:  {...meta, ...this.context},
		});
	}


	trace(message: string, ...meta: LogMetadata[]): void {
		this.log({
			id:        this.generateLogId(),
			timestamp: new Date(),
			level:     LogLevel.TRACE,
			message,
			metadata:  {...meta, ...this.context},
		});
	}


	debug(message: string, ...meta: LogMetadata[]): void {
		this.log({
			id:        this.generateLogId(),
			timestamp: new Date(),
			level:     LogLevel.DEBUG,
			message,
			metadata:  {...meta, ...this.context},
		});
	}


	protected log(log: Log): void {
		for (const appender of this.logAppenderList) {
			appender.append(log);
		}
	}


	protected registerAppender(appender: LogAppender): void {
		this.logAppenderList.push(appender);
	}


	protected unregisterAppender(appender: LogAppender): void {
		this.logAppenderList = this.logAppenderList.filter(a => a !== appender);
	}


	private generateLogId(): string {
		const ID_LENGTH = 256;
		return nanoid(ID_LENGTH)
	}
}


@Injectable()
export class CombinedLogger extends Logger {
	constructor(name?: string) {
		super({name}, [
			new ConsoleAppender(), new FileAppender({
				filePath: 'logs/app.log',
				level:    LogLevel.INFO,
			}), new FileAppender({
				filePath: 'logs/error.log',
				level:    LogLevel.ERROR,
			}),
		])
	}
}