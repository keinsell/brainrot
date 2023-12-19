import {Controller}            from "@nestjs/common"
import {AuthenticationService} from "../../authentication/services/authentication-service.js"



@Controller('session')
export class SessionController {

	constructor(private authenticationService: AuthenticationService) {

	}
}