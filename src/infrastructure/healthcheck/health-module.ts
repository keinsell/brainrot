import {Module}           from "@nestjs/common"
import {TerminusModule}   from "@nestjs/terminus"
import {DatabaseModule}   from "../database/database.module.ts"
import {HealthController} from "./health-controller.ts"

@Module({
	imports    : [
		DatabaseModule,
		TerminusModule.forRoot({
			//errorLogStyle: isDevelopment() ? 'pretty' : 'json',
			errorLogStyle: 'pretty',
		}),
	],
	controllers: [HealthController],
})
export class HealthModule {}