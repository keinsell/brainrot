import signale, {Signale} from "signale";
import {isDevelopment}    from "../../../configs/helper/is-development.js";
import {isTest}           from "../../../configs/helper/is-test.js";
import {LogAppender}      from "../log-appender.js";
import {LogLevel}         from "../log-level.js";
import {Log}              from "../log.js";



export class ConsoleAppender extends LogAppender {
	private dld: Signale = signale


	append(log: Log): void {
		if (!isDevelopment() || !isTest()) {}

		this.dld.config({
			displayBadge:     true,
			displayDate:      true,
			displayScope:     true,
			displayLabel:     true,
			displayTimestamp: true,
			underlineLabel:   true,
		})

		if (log?.metadata?.context) {
			this.dld.scope(log.metadata.context);
		}

		switch (log.level) {
			case LogLevel.TRACE:

				if (log?.metadata?.data) {
					this.dld.info(log.message, log?.metadata?.data);
				} else {
					this.dld.info(log.message);
				}

				break;
			case LogLevel.DEBUG:
				this.dld.debug(log.message);
				break;
			case LogLevel.INFO:

				if (log?.metadata?.data) {
					this.dld.success(log.message, log?.metadata?.data);
				} else {
					this.dld.success(log.message);
				}

				break;
			case LogLevel.WARN:

				if (log?.metadata?.data) {
					this.dld.warn(log.message, log?.metadata?.data);
				} else {
					this.dld.warn(log.message);
				}

				break;
			case LogLevel.ERROR:

				if (log?.metadata?.data) {
					this.dld.error(log.message, log?.metadata?.data);
				} else {
					this.dld.error(log.message);
				}

				break;
			case LogLevel.FATAL:

				if (log?.metadata?.data) {
					this.dld.fatal(log.message, log?.metadata?.data);
				} else {
					this.dld.fatal(log.message);
				}

				break;
		}
	}
}