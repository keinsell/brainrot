import {Logger} from "@nestjs/common";
import {DiagLogger} from "@opentelemetry/api";


export class NestjsDiagLogger implements DiagLogger {
    private logger = new Logger("opentelemetry:diagnostic")

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