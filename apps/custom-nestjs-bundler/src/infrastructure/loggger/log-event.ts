import {LogLevel} from "./log-level.ts"



export class LogEvent {
	constructor(
		public timestamp: Date,
		public level: LogLevel,
		public message: string,
		public context?: Record<string, any>,
	) {}
}