import {ApiProperty} from "@nestjs/swagger"
import {ApiModel}    from "../../../utilities/docs-utils/swagger-api-model.js"



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
		description: "The domain's unique identifier",
		example:     "cjld2cjxh0000qzrmn831i7rn",
		required:    true,
	}) id: string;
}