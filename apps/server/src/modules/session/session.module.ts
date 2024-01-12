import {Module}                              from "@nestjs/common"
import {JwtModule}                           from "@nestjs/jwt"
import {authorizationConfiguration}          from "../../configs/authorization-configuration.js"
import {JwtTokenManagement, TokenManagement} from "../token/token-management.js"
import {SessionController}                   from "./controllers/session-controller.js"
import {InMemorySessionRepository}           from "./repositories/in-memory.session-repository.js"
import {SessionRepository}                   from "./repositories/session-repository.js"
import {SessionService}                      from "./services/session-service.js"



@Module({
	imports: [JwtModule.register({
		secretOrPrivateKey: authorizationConfiguration.jwtSecret,
	})],
	controllers: [SessionController],
	providers: [SessionService, {provide: SessionRepository, useClass: InMemorySessionRepository}, 	{provide: TokenManagement, useClass: JwtTokenManagement}],
	exports: [SessionService],
})
export class SessionModule {}