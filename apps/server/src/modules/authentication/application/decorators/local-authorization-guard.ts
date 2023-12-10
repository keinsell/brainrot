import {AuthGuard} from "@nestjs/passport"



export class LocalAuthorizationGuard extends AuthGuard("local") {}