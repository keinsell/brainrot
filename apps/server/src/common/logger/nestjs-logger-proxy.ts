//import {Logger} from '@nestjs/common';
//
//
//

import {Injectable, LoggerService, LogLevel} from '@nestjs/common';
import {CombinedLogger, Logger}              from "./logger.js"



@Injectable()
export class NestjsLogger implements LoggerService {
	private logger: Logger;


	constructor(name?: string) {
		this.logger = new CombinedLogger(name)
	}


	verbose?(message: any, ...optionalParams: any[]) {
		this.logger.trace(message, optionalParams)
	}


	setLogLevels?(levels: LogLevel[]) {}


	public debug(message: any, ...optionalParams: any[]): any {
		this.logger.debug(message, optionalParams)
	}


	public error(message: any, ...optionalParams: any[]): any {
		this.logger.error(message, optionalParams)
	}


	public fatal(message: any, ...optionalParams: any[]): any {
		this.logger.fatal(message, optionalParams)
	}


	public log(message: any, ...optionalParams: any[]): any {
		this.logger.info(message, optionalParams)
	}


	public warn(message: any, ...optionalParams: any[]): any {
		this.logger.warn(message, optionalParams)
	}
}