import {Global, Module}     from "@nestjs/common"
import {EventBus}           from "./event-bus.js"
import {EventEmitterModule} from "@nestjs/event-emitter";



@Global() @Module({
	imports  : [EventEmitterModule.forRoot()],
	providers: [EventBus],
	exports  : [EventBus],
})
export class EventBusModule {}