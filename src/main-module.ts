import {Module}       from "@nestjs/common"
import {HealthModule} from "./modules/healthcheck/health-module.ts"


@Module({
	imports: [HealthModule],
	controllers: [],
	providers: [],
	exports: []
})
export class MainModule {}