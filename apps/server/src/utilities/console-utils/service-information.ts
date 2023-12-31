import figlet                 from "figlet"
import {ConfigurationService} from "../../configs/configuration-service.js";



export function prettyPrintServiceInformation() {
	const configService = new ConfigurationService()

	console.log(figlet.textSync(configService.get("SERVICE_NAME"), "Doom"))
	console.log(configService.get("SERVICE_DESCRIPTION") + "\n")
}