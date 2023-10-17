import {LogEvent} from "./log-event.ts"



/**
 * LogAppender is an interface that defines a log appender.
 *
 * A log appender is an object that implements a method to append log events.
 * The append() method takes a LogEvent object as a parameter and appends it somewhere,
 * like to a file or database.
 *
 * This allows different log appends to be created, that can log to different places,
 * while keeping a common interface. The logging system can then work with any LogAppender
 * implementation by calling append() without needing to know the implementation details.
 *
 * Some example LogAppender implementations:
 *
 * - FileLogAppender: Logs events to a file
 * - DatabaseLogAppender: Logs events to a database table
 * - ConsoleLogAppender: Logs events to the console/stdout
 *
 * So LogAppender provides a common way to abstract away the storage mechanism for logs.
 */
export interface LogAppender {
	append(logEvent: LogEvent): void;
}
