import {ApiProperty} from "@nestjs/swagger"
import {ApiModel}    from "../../../../../utilities/docs-utils/swagger-api-model.js"



@ApiModel({
	name:        "Account",
	description: "asdasd",
})
export class AccountDto {
	/**
	 * Represents the unique identifier of an entity.
	 *
	 * @typedef {string} Id
	 */
	@ApiProperty({
		name:        "id",
		description: "The account's unique identifier",
		example:     "",
		required:    true,
	}) id: string;
}