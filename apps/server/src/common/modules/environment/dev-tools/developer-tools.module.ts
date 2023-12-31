import {Module}         from "@nestjs/common"
import {DevtoolsModule} from "@nestjs/devtools-integration"
import {portAllocator}  from "../../../../utilities/network-utils/port-allocator.js"
import {isDevelopment}  from "../../../../configs/configuration-service.js";



@Module({
	imports    : [
		DevtoolsModule.register({
			http: isDevelopment(),
			port: await portAllocator().then((port) => port.port),
		}),
	],
	providers  : [],
	controllers: [],
	exports    : [DevtoolsModule],
})
export class DeveloperToolsModule {}