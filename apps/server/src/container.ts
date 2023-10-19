import {Module}               from '@nestjs/common';
import {AppController}        from './app.controller.js';
import {AppService}           from './app.service.js';
import {InfrastructureModule} from "./infrastructure/infrastructure.module.js"



@Module({
	imports:     [InfrastructureModule],
	controllers: [AppController],
	providers:   [AppService],
})
export class Container {}
