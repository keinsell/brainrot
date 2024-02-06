import {Injectable} from "@nestjs/common"
import {nanoid}     from "nanoid"
import {pino}       from "pino"



export enum LogLevel {
	/** For tracing purposes. */
	TRACE = 'trace',
	/** For debugging purposes. */
	DEBUG = 'debug',
	/** For informational messages. */
	INFO  = 'info',
	/** For warnings. */
	WARN  = 'warn',
	/** For errors. */
	ERROR = 'error',
	/** For fatal errors. */
	FATAL = 'fatal',
}


export interface Log {
	id: string;
	timestamp: Date;
	level: LogLevel;
	message: string;
	metadata?: LogMetadata | undefined;
}


export abstract class LogAppender {
	abstract append(log: Log): Promise<void> | void;
}


export type LogMetadataKey = "request-id" | "error" | "error-message" | "context" | string
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


export class PrettyConsoleAppender extends LogAppender {
	append(log: Log): void {
		console.log(JSON.stringify(log, null, 2));
	}
}


export class ErrorFileAppender extends LogAppender {
	private logger: pino.Logger;


	constructor() {
		super();
		this.logger = pino(pino.destination('logs/error.log'));
	}


	append(log: Log): void {
		if (log.level === LogLevel.ERROR || log.level === LogLevel.FATAL) {
			this.logger.error(log);
		}
	}
}


export class FileAppender extends LogAppender {
	private logger: pino.Logger;


	constructor() {
		super();
		this.logger = pino(pino.destination('logs/application.log'));
	}


	append(log: Log): void {
		this.logger[log.level](log);
	}
}


@Injectable()
export class CombinedLogger extends Logger {
	constructor(name?: string) {
		super({name}, [new PrettyConsoleAppender(), new ErrorFileAppender(), new FileAppender()])
	}
}