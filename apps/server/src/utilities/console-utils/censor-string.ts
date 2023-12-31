import {isDevelopment} from "../../configs/configuration-service.js";



export function censorString(string : string) : string {
	//	return env.isDev ? string : string.replace(/./g, "*")
	return isDevelopment() ? string : "[CENSORED]"
}