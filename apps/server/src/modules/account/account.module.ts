import {Module}                        from "@nestjs/common"
import {EventBusModule}                from "../../common/infrastructure/messaging/event-bus-module.js"
import {DatabaseModule}                from "../../common/infrastructure/storage/database/database.module.js"
import {CacheManagerModule}            from "../../common/libraries/cache-manager/cache-manager-module.js"
import {PwnprocModule}                 from "../../common/libraries/pwnproc/pwnproc-module.js"
import {UnihashModule}                 from "../../common/libraries/unihash/index.js"
import {AccountPolicy}                 from "./policies/account-policy.js"
import {AccountRepository}             from "./repositories/account-repository.js"
import {AccountService}                from "./services/account-service.js"
import {AccountVerification}           from "./services/account-verification.js"
import {PrismaAccountRepository}       from "./repositories/prisma-account-repository.service.js"
import {AccountRecoveryController}     from "./controllers/account-recovery.controller.js"
import {AccountVerificationController} from "./controllers/account-verification.controller.js"
import {AccountController}             from "./controllers/account.controller.js"



@Module({
	imports:     [
		DatabaseModule, PwnprocModule, UnihashModule, EventBusModule, CacheManagerModule,
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