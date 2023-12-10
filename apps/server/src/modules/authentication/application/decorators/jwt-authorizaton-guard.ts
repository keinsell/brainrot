import {AuthGuard} from "@nestjs/passport"



export class JwtAuthorizatonGuard extends AuthGuard("jwt") {}