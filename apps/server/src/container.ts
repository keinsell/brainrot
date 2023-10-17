import {Module}             from '@nestjs/common';
import {AppController}      from './app.controller.js';
import {AppService}         from './app.service.js';
import {DatabaseModule}     from "./infrastructure/database/database.module.js"
import {LocalstorageModule} from "./infrastructure/localstorage/localstorage.module.js"



@Module({
	        imports    : [DatabaseModule, LocalstorageModule],
	        controllers: [AppController],
	        providers  : [AppService],
        })
export class Container {}
