import {Module}               from '@nestjs/common';
import {AppController}        from './app.controller.ts';
import {AppService}           from './app.service.ts';
import {InfrastructureModule} from "./infrastructure/infrastructure.module.ts"



@Module({
	imports:     [InfrastructureModule],
	controllers: [AppController],
	providers:   [AppService],
})
export class Container {}
