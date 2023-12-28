import {Module}         from "@nestjs/common"
import {DevtoolsModule} from "@nestjs/devtools-integration"
import {env}            from "../../../../configs/env.js"
import {portAllocator}  from "../../../../utilities/network-utils/port-allocator.js"



@Module({
	imports    : [
		DevtoolsModule.register({
			http: env.isDevelopment,
			port: await portAllocator().then((port) => port.port),
		}),
	],
	providers  : [],
	controllers: [],
	exports    : [DevtoolsModule],
})
export class DeveloperToolsModule {}