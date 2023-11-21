import {AccountController}               from "@boundary/identity-and-access/modules/account/00-presentation/account.controller.js"
import {AccountService}                  from "@boundary/identity-and-access/modules/account/20-service/account.service.js"
import {AccountPolicy}                   from "@boundary/identity-and-access/modules/account/30-domain/policies/account-policy.js"
import {IdentityRepository}              from "@boundary/identity-and-access/modules/account/30-domain/repositories/identity-repository.js"
import {PrismaIdentityRepository}        from "@boundary/identity-and-access/modules/account/40-infrastructure/persistence/repositories/prisma.identity.repository.js"
import {PasswordHashingModule}           from "@libraries/security/password-hashing-v2/password-hashing-module.js"
import {PasswordStrengthEstimatorModule} from "@libraries/security/password-strength-estimator/password-strength-estimator-module.js"
import {Module}                          from "@nestjs/common"
import {DatabaseModule}                  from "../../../../infrastructure/storage/database/database.module.js"



@Module({
	imports: [
		DatabaseModule, PasswordStrengthEstimatorModule, PasswordHashingModule,
	],
	controllers: [AccountController],
	providers:   [
		AccountService, AccountPolicy, {
			provide:  IdentityRepository,
			useClass: PrismaIdentityRepository,
		},
	],
	exports:     [AccountService, IdentityRepository],
})
export class AccountModule {}