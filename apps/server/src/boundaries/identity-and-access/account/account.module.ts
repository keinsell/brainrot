import {Module}            from "@nestjs/common"
import {DatabaseModule}    from "../../../infrastructure/database/database.module.js"
import {AccountController} from "./application/account.controller.js"
import {AccountService}    from "./services/account.service.js"



@Module({
	imports:     [DatabaseModule],
	controllers: [AccountController],
	providers:   [AccountService],
	exports:     [AccountService],
})
export class AccountModule {

}