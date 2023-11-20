import {CreateAccount} from "@boundary/identity-and-access/modules/account/10-application/commands/create-account.js"
import {PickType}      from "@nestjs/swagger"



export class RegisterAccount extends PickType(CreateAccount, [
	"email", "password", "username",
] as const) {

}