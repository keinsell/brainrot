import {Injectable, Logger} from "@nestjs/common"
import {DiagnosticLogger}   from "./diagnostic-logger.js"



@Injectable()
export class InternalDiagnosticLogger implements DiagnosticLogger {
	private logger: Logger = new Logger('otel-diagnostics')


	public debug(message: string, args: unknown): void {
		this.logger.debug(message, args)
	}


	public error(message: string, args: unknown): void {
		this.logger.error(message, args)
	}


	public info(message: string, args: unknown): void {
		this.logger.log(message, args)
	}


	public verbose(message: string, args: unknown): void {
		this.logger.verbose(message, args)
	}


	public warn(message: string, args: unknown): void {
		this.logger.warn(message, args)
	}
}