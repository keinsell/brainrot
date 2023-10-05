import {Module}                      from "@nestjs/common"
import {ConfigModule, ConfigService} from "@nestjs/config"
import {EnvironmentConfiguration}    from "./environment-configuration.service.ts"

@Module({
	imports    : [ConfigModule.forRoot()],
	controllers: [EnvironmentConfiguration],
	providers  : [ConfigService],
	exports    : [ConfigModule.forRoot(), EnvironmentConfiguration],
})
export class ConfigurationModule {}