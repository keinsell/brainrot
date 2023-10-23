import {CreateAccount} from "@boundary/identity-and-access/account/application/commands/create-account.js"
import {PickType}      from "@nestjs/swagger"
import {ApiModel}      from "../../../../../utilities/docs-utils/swagger-api-model.js"



/** TEST */
@ApiModel({
	name:        "CreateAccount2",
	description: "asdasd",
})
export class RegisterAccount extends PickType(CreateAccount, [
	"email", "password", "username",
] as const) {

}