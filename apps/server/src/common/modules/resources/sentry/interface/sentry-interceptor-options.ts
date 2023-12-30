import {SeverityLevel}                  from "@sentry/node"
import {SentryInterceptorOptionsFilter} from "./sentry-interceptor-options-filter.js"



export interface SentryInterceptorOptions {
	filters? : SentryInterceptorOptionsFilter[];
	tags? : { [key : string] : string };
	extra? : { [key : string] : any };
	fingerprint? : string[];
	level? : SeverityLevel;

	// https://github.com/getsentry/sentry-javascript/blob/master/packages/node/src/handlers.ts#L163
	request? : boolean;
	serverName? : boolean;
	// https://github.com/getsentry/sentry-javascript/blob/master/packages/node/src/handlers.ts#L16
	transaction? : boolean | 'path' | 'methodPath' | 'handler';
	user? : boolean | string[];
	version? : boolean;
}