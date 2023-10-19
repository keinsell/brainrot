import figlet from "figlet"
import {env}  from "../../configs/env.js"



export function prettyPrintServiceInformation() {
	console.log(figlet.textSync(env.SERVICE_NAME as string, "Doom"))
	console.log(env.SERVICE_DESCRIPTION + "\n")
}