import {Module}                        from "@nestjs/common"
import {DatabaseModule}                from "../../common/infrastructure/storage/database/database.module.js"
import {PwnprocModule}                 from "../../common/libraries/pwnproc/pwnproc-module.js"
import {UnihashModule}                 from "../../common/libraries/unihash/index.js"
import {AccountPolicy}                 from "./domain/policies/account-policy.js"
import {AccountRepository}             from "./domain/repositories/account-repository.js"
import {AccountService}                from "./domain/services/account-service.js"
import {PrismaIdentityRepository}      from "./persistence/repositories/prisma.identity.repository.js"
import {AccountRecoveryController}     from "./presentation/account-recovery.controller.js"
import {AccountVerificationController} from "./presentation/account-verification.controller.js"
import {AccountController}             from "./presentation/account.controller.js"



@Module({
	imports:     [
		DatabaseModule, PwnprocModule, UnihashModule,
	],
	controllers: [AccountController, AccountRecoveryController, AccountVerificationController],
	providers:   [
		AccountService, AccountPolicy, {
			provide:  AccountRepository,
			useClass: PrismaIdentityRepository,
		},
	],
	exports:     [AccountService, AccountRepository],
})
export class AccountModule {}