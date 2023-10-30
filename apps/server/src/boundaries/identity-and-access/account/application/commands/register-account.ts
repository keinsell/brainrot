import {CreateAccount} from "@boundary/identity-and-access/account/application/commands/create-account.js"
import {PickType}      from "@nestjs/swagger"



/** TEST */

export class RegisterAccount extends PickType(CreateAccount, [
	"email", "password", "username",
] as const) {

}