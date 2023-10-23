import {AccountPolicy}     from "@boundary/identity-and-access/account/services/policies/account-policy.js"
import {Module}            from "@nestjs/common"
import {DatabaseModule}    from "../../../infrastructure/storage/database/database.module.js"
import {AccountController} from "./application/account.controller.js"
import {AccountService}    from "./services/account.service.js"



@Module({
	imports:     [DatabaseModule],
	controllers: [AccountController],
	providers:   [AccountService, AccountPolicy],
	exports:     [AccountService],
})
export class AccountModule {

}