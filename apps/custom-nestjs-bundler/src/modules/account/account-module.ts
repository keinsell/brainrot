import {Module}                  from "@nestjs/common"
import {DatabaseModule}          from "../../infrastructure/database/database.module.ts"
import {AccountController}       from "./account-controller.ts"
import {AccountPolicy}           from "./account-policy.js"
import {PrismaAccountRepository} from "./account-repository.js"
import {AccountService}          from "./account-service.ts"



@Module({
	        imports    : [DatabaseModule],
	        controllers: [AccountController],
	        providers  : [
		        PrismaAccountRepository,
		        AccountService, AccountPolicy,
	        ],
	        exports    : [AccountService],
        })
export class AccountModule {}