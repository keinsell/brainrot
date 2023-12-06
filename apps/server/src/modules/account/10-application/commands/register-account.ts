import {PickType}      from "@nestjs/swagger"
import {CreateAccount} from "./create-account.js"



export class RegisterAccount extends PickType(CreateAccount, [
	"email", "password", "username",
] as const) {

}