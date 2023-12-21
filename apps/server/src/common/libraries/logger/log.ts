import {randomUUID} from "node:crypto"
import {LogLevel}   from "./log-level.js"


// TODO: https://logging.apache.org/log4j/2.x/manual/layouts.html#rfc5424-layout
interface LogV2 {
	id: string;
	level: LogLevel;
	message: string;
	timestamp: Date;
	metadata?: Record<string, any>;
}


export interface LogPayload {
	level: LogLevel;
	message: string;
}


export class Log {
	id: string = randomUUID()
	level: LogLevel;
	message: string;


	constructor(payload: LogPayload) {
		this.level   = payload.level;
		this.message = payload.message;
	}
}
