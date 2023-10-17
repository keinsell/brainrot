import {Module}                      from "@nestjs/common"
import {ConfigModule, ConfigService} from "@nestjs/config"



@Module({
	        imports    : [ConfigModule.forRoot()],
	        controllers: [],
	        providers  : [ConfigService],
	        exports    : [ConfigModule.forRoot()],
        })
export class ConfigurationModule {}