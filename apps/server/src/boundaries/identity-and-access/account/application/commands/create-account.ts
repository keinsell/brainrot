import {ApiExtraModels, ApiProperty} from "@nestjs/swagger"
import {ApiModel}                    from "../../../../../utilities/docs-utils/swagger-api-model.js"



@ApiModel({
	name:        "CreateAccount",
	description: "asdasd",
})
export class CreateAccount {
	/**
	 * Represents the unique identifier of an entity.
	 *
	 * @typedef {string} Id
	 */
	@ApiProperty({
		name:        "id",
		description: "The account's unique identifier",
	}) id: string;
	/**
	 * Represents an email address.
	 * @typedef {string} email
	 */
	@ApiProperty({
		name:        "email",
		description: "The account's email address",
	}) email: string;
	/**
	 * Indicates whether the email associated with a user account has been verified.
	 *
	 * @type {boolean}
	 */
	@ApiProperty({
		name:        "emailVerified",
		description: "Indicates whether the email associated with a user account has been verified",
	}) emailVerified: boolean;
	/**
	 * The password variable is a string that represents a user's password.
	 *
	 * @type {string}
	 */
	@ApiProperty({
		name:        "password",
		description: "The account's password",
	}) password: string;
	/**
	 * Represents a username.
	 * @typedef {string} username
	 */
	@ApiProperty({
		name:        "username",
		description: "The account's username",
	}) username: string;
}


@ApiExtraModels()
export class CreateAccountDto extends CreateAccount {}