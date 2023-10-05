import {Injectable}    from "@nestjs/common"
import {ConfigService} from "@nestjs/config"

@Injectable()
export class EnvironmentConfiguration {
	constructor(
		private configService: ConfigService,
	) {}

	/** Hostname or the name of the computer or system that you are currently working on. The hostname is a label
	 * a assigned to a device on a network, and it's used to identify that device within the network. */
	public HOST() {
		const hostname = this.configService.get("HOST")

		// Is there option to validate hostname?

		return hostname
	}
}