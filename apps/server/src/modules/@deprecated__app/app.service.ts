import {Injectable}    from '@nestjs/common';
import {PrismaService} from "../../infrastructure/database/prisma/prisma-service.js"



@Injectable()
export class AppService {
	constructor(private prismaService: PrismaService) {}

	async getHello(): Promise<string> {

		console.log(await this.prismaService.account.count())

		return 'Hello World!';
	}
}
