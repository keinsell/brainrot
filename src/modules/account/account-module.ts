import {Module}                                     from "@nestjs/common"
import {DatabaseModule}                             from "../../infrastructure/database/database.module.ts"
import {AccountController}                          from "./account-controller.ts"
import {AccountPolicy}                              from "./account-policy.js"
import {AccountRepository, PrismaAccountRepository} from "./account-repository.js"
import {AccountService}                             from "./account-service.ts"

@Module({
	imports    : [DatabaseModule],
	controllers: [AccountController],
	providers  : [
		AccountService, AccountPolicy, {
			provide : AccountRepository,
			useClass: PrismaAccountRepository,
		},
	],
	exports    : [AccountService],
})
export class AccountModule {}