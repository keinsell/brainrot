import {AccountController}        from "@boundary/identity-and-access/modules/account/00-presentation/account.controller.js"
import {AccountService}           from "@boundary/identity-and-access/modules/account/20-service/account.service.js"
import {AccountPolicy}            from "@boundary/identity-and-access/modules/account/30-domain/policies/account-policy.js"
import {AccountRepository}        from "@boundary/identity-and-access/modules/account/30-domain/repositories/account-repository.js"
import {PrismaIdentityRepository} from "@boundary/identity-and-access/modules/account/40-infrastructure/persistence/repositories/prisma.identity.repository.js"
import {Module}                   from "@nestjs/common"
import {DatabaseModule}           from "../../../../common/infrastructure/storage/database/database.module.js"
import {PwnprocModule}            from "../../../../common/libraries/pwnproc/pwnproc-module.js"
import {UnihashModule}            from "../../../../common/libraries/unihash/index.js"



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