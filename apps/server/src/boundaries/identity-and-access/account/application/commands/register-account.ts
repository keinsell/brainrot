import {CreateAccount} from "@iam/account/application/commands/create-account.js"
import {PickType}      from "@nestjs/swagger"



export class RegisterAccount extends PickType(CreateAccount, [
	"email", "password", "username",
] as const) {

}