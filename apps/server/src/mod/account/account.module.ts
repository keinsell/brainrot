import {Module}                        from '@nestjs/common'
import {AccountController}             from '../../http/v1/account/account.controller.js'
import {AccountRecoveryController}     from '../../http/v1/recovery/account-recovery.controller.js'
import {AccountVerificationController} from '../../http/v1/verification/account-verification.controller.js'
import {PwnprocModule}                 from '../../kernel/libraries/pwnproc/pwnproc-module.js'
import {UnihashModule}                 from '../../kernel/libraries/unihash/index.js'
import {MailerModule}                  from '../../kernel/mailer/mailer-module.js'
import {DatabaseModule}                from '../../kernel/modules/database/database.module.js'
import {EventBusModule}                from '../../kernel/modules/messaging/event-bus-module.js'
import {OpentelemetryTracer}           from '../../kernel/modules/observability/tracing/opentelemetry/provider/tracer/opentelemetry-tracer.js'
import {CacheManagerModule}            from '../../kernel/modules/storage/cache-manager/cache-manager-module.js'
import {NotificationModule}            from '../../kernel/notification/notification-module.js'
import {RegisterAccountUseCase}        from "./commands/register-account/register-account-usecase.js"
import {AccountPolicy}                 from './policies/account-policy.js'
import {AccountRepository}             from './repositories/account-repository.js'
import {PrismaAccountRepository}       from './repositories/prisma-account-repository.service.js'
import {AccountRecovery}               from './services/account-recovery.js'
import {AccountService}                from './services/account-service.js'
import {AccountVerification}           from './services/account-verification.js'



@Module({
	imports:     [
		DatabaseModule, PwnprocModule, UnihashModule, EventBusModule, CacheManagerModule, MailerModule,
		NotificationModule,
	],
	controllers: [
		AccountController, AccountRecoveryController, AccountVerificationController,
	],
	providers:   [
		AccountService, RegisterAccountUseCase, AccountPolicy, {
			provide:  AccountRepository,
			useClass: PrismaAccountRepository,
		}, AccountVerification, AccountRecovery, // Workaround for crashing seeder which is using AccountService
		// class which is dependent on TraceService.
		OpentelemetryTracer,
	],
	exports:     [
		AccountService, AccountRepository,
	],
})
export class AccountModule {
}