import {Module}       from "@nestjs/common"
import {PrismaModule} from "./adapters/prisma/prisma-module.js"



@Module({
	imports:     [PrismaModule],
	controllers: [],
	providers:   [],
	exports:     [PrismaModule],
})
export class DatabaseModule {}