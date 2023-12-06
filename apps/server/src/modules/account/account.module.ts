import {Module}                   from "@nestjs/common"
import {DatabaseModule}           from "../../common/infrastructure/storage/database/database.module.js"
import {PwnprocModule}            from "../../common/libraries/pwnproc/pwnproc-module.js"
import {UnihashModule}            from "../../common/libraries/unihash/index.js"
import {AccountPolicy}            from "../../domain/account/policies/account-policy.js"
import {AccountRepository}        from "../../domain/account/repositories/account-repository.js"
import {AccountController}        from "./00-presentation/account.controller.js"
import {AccountService}           from "./20-service/account.service.js"
import {PrismaIdentityRepository} from "./40-infrastructure/persistence/repositories/prisma.identity.repository.js"



@Module({
	imports:     [
		DatabaseModule, PwnprocModule, UnihashModule,
	],
	controllers: [AccountController],
	providers:   [
		AccountService, AccountPolicy, {
			provide:  AccountRepository,
			useClass: PrismaIdentityRepository,
		},
	],
	exports:     [AccountService, AccountRepository],
})
export class AccountModule {}