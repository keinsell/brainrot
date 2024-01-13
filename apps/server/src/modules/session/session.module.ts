import {Module}                              from "@nestjs/common"
import {JwtModule}                           from "@nestjs/jwt"
import {JwtTokenManagement, TokenManagement} from "../authtoken/token-management.js"
import {SessionController}                   from "./controllers/session-controller.js"
import {InMemorySessionRepository}           from "./repositories/in-memory.session-repository.js"
import {SessionRepository}                   from "./repositories/session-repository.js"
import {SessionService}                      from "./services/session-service.js"
import {__authConfig}                        from "../../configs/global/__config.js";



@Module({
	imports    : [
		JwtModule.register({
			secretOrPrivateKey: __authConfig.JWT_SECRET,
		}),
	],
	controllers: [SessionController],
	providers  : [
		SessionService,
		{provide: SessionRepository, useClass: InMemorySessionRepository},
		{provide: TokenManagement, useClass: JwtTokenManagement},
	],
	exports    : [SessionService],
})
export class SessionModule {}