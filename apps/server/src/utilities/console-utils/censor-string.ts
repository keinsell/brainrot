import {env} from "../../configs/env.js"



export function censorString(string: string): string {
	//	return env.isDev ? string : string.replace(/./g, "*")
	return env.isDev ? string : "[CENSORED]"
}