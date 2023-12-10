import {PickType}         from "@nestjs/swagger"
import {ApiModel}         from "../../../utilities/docs-utils/swagger-api-model.js"
import {CreateAccountDto} from "./create-account-dto.js"



@ApiModel({
	name:        "RegisterAccount",
	description: "asdasd",
})
export class RegisterAccountDto extends PickType(CreateAccountDto, [
	"email", "password", "username",
] as const) {}