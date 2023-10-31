import {AccountPolicy}            from "@boundary/identity-and-access/account/domain/policies/account-policy.js"
import {IdentityRepository}       from "@boundary/identity-and-access/account/domain/repositories/identity-repository.js"
import {PrismaIdentityRepository} from "@boundary/identity-and-access/account/infrastructure/repositories/prisma.identity.repository.js"
import {Module}                   from "@nestjs/common"
import {DatabaseModule}           from "../../../infrastructure/storage/database/database.module.js"
import {AccountController}        from "./application/account.controller.js"
import {AccountService}           from "./services/account.service.js"



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
export class AccountModule {

}