import dotenv                            from "dotenv"
import {bool, cleanEnv, host, port, str} from "envalid"
import process                           from 'node:process'



dotenv.config();

export const env = cleanEnv(process.env, {
	PROTOCOL           : str({
		default: "http",
		choices: [
			"http",
			"https",
		],
		desc   : "Defines the protocol used by the application. Options are 'http' or 'https'. Default is 'http'.",
	}),
	HOST               : host({
		default   : "localhost",
		devDefault: "localhost",
		desc      : "Defines the host on which the application runs. Default for development is 'localhost'.",
	}),
	PORT               : port({
		devDefault: 1337,
		default   : 80,
		desc      : "Defines the port on which the application listens. Default for development is 1337, otherwise it's 80.",
	}),
	SERVICE_NAME       : str({
		default: "methylphenidate",
		desc   : "Defines the name of the service. Default is 'methylphenidate'.",
	}),
	SERVICE_DESCRIPTION: str({
		default: "Methylphenidate is a boilerplate for Nest.js applications with batteries included.",
		desc   : "Provides a brief description of the service. Default description is set.",
	}),
	NODE_ENV           : str({
		choices   : [
			'development',
			'test',
			'production',
			'staging',
		],
		default   : 'development',
		devDefault: 'development',
		desc      : "Sets the application environment. Can be one of 'development', 'test', 'production', or 'staging'. Default is 'development'.",
	}),
	TRACING            : bool({
		default   : true,
		devDefault: true,
		desc      : "Enables or disables OpenTelemetry tracing, which traces requests and responses between services and applications. Default is enabled.",
	}),
	SENTRY_DSN         : str({
		default   : "https://722df91ab634a7aa99ac7381acd8cf92@o1122681.ingest.sentry.io/4506475919310848",
		devDefault: "https://722df91ab634a7aa99ac7381acd8cf92@o1122681.ingest.sentry.io/4506475919310848",
		desc      : "Defines the Sentry DSN. Default is empty.",
	}),
});


export function getApplicationUrl() {
	return `${env.PROTOCOL}://${env.HOST}:${env.PORT}`;
}