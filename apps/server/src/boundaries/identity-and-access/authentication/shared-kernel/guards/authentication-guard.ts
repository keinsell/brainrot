import {Injectable} from "@nestjs/common"
import {AuthGuard}  from "@nestjs/passport"

// TODO: Add profile to context
// TODO: Get or create session
// TODO: Add session to context
// TODO: Add user to context
@Injectable()
export class AuthenticationGuard extends AuthGuard(["local", "jwt"]) {}