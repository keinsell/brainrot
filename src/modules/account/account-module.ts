import {Module}            from "@nestjs/common"
import {DatabaseModule}    from "../../infrastructure/database/database.module.ts"
import {AccountController} from "./account-controller.ts"
import {AccountService}    from "./account-service.ts"

@Module({
	imports    : [DatabaseModule],
	controllers: [AccountController],
	providers  : [AccountService],
	exports    : [AccountService],
})
export class AccountModule {}