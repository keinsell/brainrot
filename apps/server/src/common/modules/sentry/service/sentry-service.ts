import {ConsoleLogger, Inject, Injectable, OnApplicationShutdown} from '@nestjs/common';
import * as Sentry                                                from '@sentry/node';
import {SeverityLevel}                                            from '@sentry/node';
import {Client, ClientOptions}                                    from '@sentry/types';
import {SENTRY_MODULE_OPTIONS}                                    from "../constant/SENTRY_MODULE_OPTIONS.js"
import {SentryModuleOptions}                                      from "../interface/sentry-module-options.js"
import {Severity}                                                 from "../structure/severity.js"



@Injectable()
export class SentryService
	extends ConsoleLogger
	implements OnApplicationShutdown {
	private static serviceInstance : SentryService;
	app = 'sentry-service: ';


	constructor(@Inject(SENTRY_MODULE_OPTIONS) readonly opts? : SentryModuleOptions) {
		super();
		if (!(
			opts && opts.dsn
		))
		{
			return;
		}
		const {
			      integrations = [],
			      ...sentryOptions
		      } = opts;
		Sentry.init({
			...sentryOptions,
			integrations: [
				new Sentry.Integrations.OnUncaughtException({
					onFatalError: async (err) => {
						if (err.name === 'SentryError') {
							console.log(err);
						}
						else {
							Sentry.getCurrentHub().getClient<Client<ClientOptions>>()?.captureException(err);
							process.exit(1);
						}
					},
				}),
				new Sentry.Integrations.OnUnhandledRejection({mode: 'warn'}),
				...integrations,
			],
		});
	}


	public static SentryServiceInstance() : SentryService {
		if (!SentryService.serviceInstance) {
			SentryService.serviceInstance = new SentryService();
		}
		return SentryService.serviceInstance;
	}


	instance() {
		return Sentry;
	}


	async onApplicationShutdown() {
		if (this.opts?.close?.enabled === true) {
			await Sentry.close(this.opts?.close.timeout);
		}
	}


	log(message : string, context? : string, asBreadcrumb? : boolean) {
		this.handleLog(super.log, Severity.Log, message, context, asBreadcrumb);
	}


	error(message : string, trace? : string, context? : string) {
		this.handleLog(
			super.error,
			Severity.Error,
			message + (
				        trace ? `\n${trace}` : ""
			        ),
			context,
		);
	}


	warn(message : string, context? : string, asBreadcrumb? : boolean) {
		this.handleLog(super.warn, Severity.Warning, message, context, asBreadcrumb);
	}

	debug(message : string, context? : string, asBreadcrumb? : boolean) {
		this.handleLog(super.debug, Severity.Debug, message, context, asBreadcrumb);
	}

	verbose(message : string, context? : string, asBreadcrumb? : boolean) {
		this.handleLog(super.verbose, Severity.Info, message, context, asBreadcrumb);
	}

	private handleLog(
		logFunction : (msg : string, context : string) => void,
		severity : SeverityLevel,
		message : string,
		context? : string,
		asBreadcrumb? : boolean,
	)
	{
		const logMessage = `${this.app} ${message}`;
		try {
			logFunction.call(this, logMessage, context);
			if (asBreadcrumb) {
				Sentry.addBreadcrumb({
					message: logMessage,
					level  : severity,
					data   : {context},
				});
			}
			else {
				Sentry.captureMessage(logMessage, severity);
			}
		}
		catch (err) {}
	}

}