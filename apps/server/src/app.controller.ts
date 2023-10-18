import {Controller, Get} from '@nestjs/common';
import {ApiOperation}    from "@nestjs/swagger"
import {AppService}      from './app.service.ts';



@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({
		operationId: "hello-get",
		tags:        ['hello'],
	}) @Get()
	async getHello(): Promise<string> {
		return await this.appService.getHello();
	}
}
