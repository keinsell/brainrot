import {Module}               from "@nestjs/common"
import {AccountModule}        from "../../modules/account/account.module.js"
import {AuthenticationModule} from "../../modules/authentication/authentication-module.js"



@Module({
	imports:     [AccountModule, AuthenticationModule],
	controllers: [],
	providers:   [],
	exports:     [AccountModule, AuthenticationModule],
})
export class IdentityAndAccessModule {}