import { Module }                        from '@nestjs/common'
import { CacheManagerModule }            from '../../common/libraries/cache-manager/cache-manager-module.js'
import { PwnprocModule }                 from '../../common/libraries/pwnproc/pwnproc-module.js'
import { UnihashModule }                 from '../../common/libraries/unihash/index.js'
import { MailerModule }                  from '../../common/mailer/mailer-module.js'
import { DatabaseModule }                from '../../common/modules/database/database.module.js'
import { EventBusModule }                from '../../common/modules/messaging/event-bus-module.js'
import { NotificationModule }            from '../../common/notification/notification-module.js'
import { AccountRecoveryController }     from './controllers/account-recovery.controller.js'
import { AccountVerificationController } from './controllers/account-verification.controller.js'
import { AccountController }             from './controllers/account.controller.js'
import { AccountPolicy }                 from './policies/account-policy.js'
import { AccountRepository }             from './repositories/account-repository.js'
import { PrismaAccountRepository }       from './repositories/prisma-account-repository.service.js'
import { AccountRecovery }               from './services/account-recovery.js'
import { AccountService }                from './services/account-service.js'
import { AccountVerification }           from './services/account-verification.js'



@Module( {
			  imports     : [
				 DatabaseModule,
				 PwnprocModule,
				 UnihashModule,
				 EventBusModule,
				 CacheManagerModule,
				 MailerModule,
				 NotificationModule,
			  ],
			  controllers : [
				 AccountController,
				 AccountRecoveryController,
				 AccountVerificationController,
			  ],
			  providers   : [
				 AccountService,
				 AccountPolicy,
				 {
					provide  : AccountRepository,
					useClass : PrismaAccountRepository,
				 },
				 AccountVerification,
				 AccountRecovery,
			  ],
			  exports     : [
				 AccountService,
				 AccountRepository,
			  ],
			} )
export class AccountModule {}