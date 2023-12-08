import {PickType}         from "@nestjs/swagger"
import {CreateAccountDto} from "./create-account-dto.js"



export class RegisterAccountDto extends PickType(CreateAccountDto, [
	"email", "password", "username",
] as const) {}