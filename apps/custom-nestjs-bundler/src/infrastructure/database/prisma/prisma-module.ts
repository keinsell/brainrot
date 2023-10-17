import {Module}        from "@nestjs/common"
import {PrismaService} from "./prisma-service.ts"



@Module({
	        imports    : [],
	        controllers: [],
	        providers  : [PrismaService],
	        exports    : [PrismaService],
        })
export class PrismaModule {}