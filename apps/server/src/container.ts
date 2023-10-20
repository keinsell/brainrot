import {Module}               from '@nestjs/common';
import {InfrastructureModule} from "./infrastructure/infrastructure.module.js"
import {AppController}        from './modules/@deprecated__app/app.controller.js';
import {AppService}           from './modules/@deprecated__app/app.service.js';



@Module({
	imports:     [InfrastructureModule],
	controllers: [AppController],
	providers:   [AppService],
})
export class Container {}
