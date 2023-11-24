import {AccountController}               from "@boundary/identity-and-access/modules/account/00-presentation/account.controller.js"
import {AccountService}                  from "@boundary/identity-and-access/modules/account/20-service/account.service.js"
import {AccountPolicy}                   from "@boundary/identity-and-access/modules/account/30-domain/policies/account-policy.js"
import {IdentityRepository}              from "@boundary/identity-and-access/modules/account/30-domain/repositories/identity-repository.js"
import {PrismaIdentityRepository}        from "@boundary/identity-and-access/modules/account/40-infrastructure/persistence/repositories/prisma.identity.repository.js"
import {Module}                          from "@nestjs/common"
import {DatabaseModule}                  from "../../../../common/infrastructure/storage/database/database.module.js"
import {PasswordHashingModule}           from "../../../../common/libraries/security/password-hashing-v2/password-hashing-module.js"
import {PasswordStrengthEstimatorModule} from "../../../../common/libraries/security/password-strength-estimator/password-strength-estimator-module.js"



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