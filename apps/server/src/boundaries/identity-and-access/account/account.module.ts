import {AccountPolicy}            from "@iam/account/domain/policies/account-policy.js"
import {IdentityRepository}       from "@iam/account/domain/repositories/identity-repository.js"
import {PrismaIdentityRepository} from "@iam/account/infrastructure/persistence/repositories/prisma.identity.repository.js"
import {AccountController}        from "@iam/account/presentation/account.controller.js"
import {AccountService}           from "@iam/account/services/account.service.js"
import {Module}                   from "@nestjs/common"
import {DatabaseModule}           from "../../../infrastructure/storage/database/database.module.js"



@Module({
	imports:     [DatabaseModule],
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