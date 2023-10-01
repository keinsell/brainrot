import {Module}           from "@nestjs/common"
import {TerminusModule}   from "@nestjs/terminus"
import {HealthController} from "./health-controller.ts"

@Module({
	imports    : [
		TerminusModule.forRoot({
			//errorLogStyle: isDevelopment() ? 'pretty' : 'json',
			errorLogStyle: 'json',
		}),
	],
	controllers: [HealthController],
})
export class HealthModule {}