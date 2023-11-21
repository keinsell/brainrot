import {Module}         from "@nestjs/common"
import {DevtoolsModule} from "@nestjs/devtools-integration"
import {env}            from "../../../configs/env.js"



@Module({
	imports:     [
		DevtoolsModule.register({
			http: env.isDevelopment,
		}),
	],
	providers:   [],
	controllers: [],
	exports:     [DevtoolsModule],
})
export class DeveloperToolsModule {}