import dotenv                            from "dotenv"
import {bool, cleanEnv, host, port, str} from "envalid"



dotenv.config();

export const env = cleanEnv(process.env, {
	PROTOCOL           : str({default: "http", choices: ["http", "https"]}),
	HOST               : host({devDefault: "localhost"}),
	PORT               : port({
		                          devDefault: 1337,
		                          default   : 80,
		                          desc      : "PORT stands for port on which application will be listening.",
	                          }),
	SERVICE_NAME       : str({default: "methylophenidate"}),
	SERVICE_DESCRIPTION: str({default: "Methylophenidate is a boilerplate for Nest.js applications with batteries included."}),
	NODE_ENV           : str({
		                         choices   : ['development', 'test', 'production', 'staging'],
		                         default   : 'development',
		                         devDefault: 'development',
		                         desc      : "NODE_ENV stands for environment in which application is run. It can" +
		                                     " control features and functionality of software, it is strongly not" +
		                                     " advised to publicly share application under development or test environments.",
	                         }),
	TRACING            : bool({
		                          default   : true,
		                          desc      : "TRACING stands for OpenTelemetry tracing. It can be used to trace requests and responses" +
		                                      " between services and applications. It is strongly not advised to publicly share" +
		                                      " application under development or test environments.",
		                          devDefault: false,
	                          }),
})
