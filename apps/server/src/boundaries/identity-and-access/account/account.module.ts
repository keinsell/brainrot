import {AccountPolicy}            from "@boundary/identity-and-access/account/domain/policies/account-policy.js"
import {IdentityRepository}       from "@boundary/identity-and-access/account/domain/repositories/identity-repository.js"
import {PrismaIdentityRepository} from "@boundary/identity-and-access/account/infrastructure/persistence/repositories/prisma.identity.repository.js"
import {AccountController}        from "@boundary/identity-and-access/account/presentation/account.controller.js"
import {AccountService}           from "@boundary/identity-and-access/account/services/account.service.js"
import {PasswordHashingModule}    from "@libraries/security/password-hashing/password-hashing-module.js"
import {Module}                   from "@nestjs/common"
import {DatabaseModule}           from "../../../infrastructure/storage/database/database.module.js"



@Module({
	imports:     [DatabaseModule, PasswordHashingModule],
	controllers: [AccountController],
	providers:   [
		AccountService, AccountPolicy, {
			provide:  IdentityRepository,
			useClass: PrismaIdentityRepository,
		},
	],
	exports:     [AccountService],
})
export class AccountModule {}