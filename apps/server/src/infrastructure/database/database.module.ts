import {Module}       from "@nestjs/common"
import {PrismaModule} from "./prisma/prisma-module.js"



@Module({
	imports:     [PrismaModule],
	controllers: [],
	providers:   [],
	exports:     [PrismaModule],
})
export class DatabaseModule {}