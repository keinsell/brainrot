import {AccountController}               from "@boundary/identity-and-access/modules/account/00-presentation/account.controller.js"
import {AccountService}                  from "@boundary/identity-and-access/modules/account/20-service/account.service.js"
import {AccountPolicy}                   from "@boundary/identity-and-access/modules/account/30-domain/policies/account-policy.js"
import {AccountRepository}               from "@boundary/identity-and-access/modules/account/30-domain/repositories/account-repository.js"
import {PrismaIdentityRepository}        from "@boundary/identity-and-access/modules/account/40-infrastructure/persistence/repositories/prisma.identity.repository.js"
import {PasswordHashingModule}           from "@lib/security/hashing/index.js"
import {PasswordStrengthEstimatorModule} from "@lib/security/password-estimation/password-strength-estimator-module.js"
import {Module}                          from "@nestjs/common"
import {DatabaseModule}                  from "../../../../common/infrastructure/storage/database/database.module.js"



@Module({
	imports:     [
		DatabaseModule, PasswordStrengthEstimatorModule, PasswordHashingModule,
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