import {Module}                        from "@nestjs/common"
import {EventBusModule}                from "../../common/infrastructure/messaging/event-bus-module.js"
import {DatabaseModule}                from "../../common/infrastructure/storage/database/database.module.js"
import {PwnprocModule}                 from "../../common/libraries/pwnproc/pwnproc-module.js"
import {UnihashModule}                 from "../../common/libraries/unihash/index.js"
import {AccountPolicy}                 from "./domain/policies/account-policy.js"
import {AccountRepository}             from "./domain/repositories/account-repository.js"
import {AccountService}                from "./domain/services/account-service.js"
import {AccountVerification}           from "./domain/services/account-verification.js"
import {PrismaAccountRepository}       from "./persistence/repositories/prisma-account-repository.service.js"
import {AccountRecoveryController}     from "./presentation/account-recovery.controller.js"
import {AccountVerificationController} from "./presentation/account-verification.controller.js"
import {AccountController}             from "./presentation/account.controller.js"



@Module({
	imports:     [
		DatabaseModule, PwnprocModule, UnihashModule, EventBusModule,
	],
	controllers: [AccountController, AccountRecoveryController, AccountVerificationController],
	providers:   [
		AccountService, AccountPolicy, {
			provide:  AccountRepository,
			useClass: PrismaAccountRepository,
		}, AccountVerification,
	],
	exports:     [AccountService, AccountRepository],
})
export class AccountModule {}