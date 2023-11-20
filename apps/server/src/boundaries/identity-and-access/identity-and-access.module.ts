import {AccountModule}        from "@boundary/identity-and-access/modules/account/account.module.js"
import {AuthenticationModule} from "@boundary/identity-and-access/modules/authentication/authentication-module.js"
import {Module}               from "@nestjs/common"



@Module({
	imports:     [AccountModule, AuthenticationModule],
	controllers: [],
	providers:   [],
	exports:     [AccountModule, AuthenticationModule],
})
export class IdentityAndAccessModule {}