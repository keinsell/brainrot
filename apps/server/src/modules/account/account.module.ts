import {Module}            from "@nestjs/common"
import {AccountController} from "./interface/account.controller.js"



@Module({
	imports:     [],
	controllers: [AccountController],
	providers:   [],
	exports:     [],
})
export class AccountModule {

}