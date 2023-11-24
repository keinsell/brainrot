import {IdentityAndAccessModule} from "@boundary/identity-and-access/identity-and-access.module.js"
import {Module}                  from '@nestjs/common';
import {InfrastructureModule}    from "./common/infrastructure/infrastructure.module.js"



@Module({
	imports:     [IdentityAndAccessModule, InfrastructureModule],
	controllers: [],
	providers:   [],
})
export class Container {}