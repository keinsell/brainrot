import {Module}       from "@nestjs/common"
import {PrismaModule} from "./prisma/prisma-module.ts"



@Module({
	imports:     [PrismaModule],
	controllers: [],
	providers:   [],
	exports:     [PrismaModule],
})
export class DatabaseModule {}