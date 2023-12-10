import {faker}          from "@faker-js/faker"
import {ApiProperty}    from "@nestjs/swagger"
import {ApiModel}       from "../../../utilities/docs-utils/swagger-api-model.js"
import {AccountFixture} from "../../../utilities/fixtures/account-fixture.js"



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

	/**
	 * Represents an email address.
	 * @typedef {string} email
	 */
	@ApiProperty({
		name:        "email",
		description: "The domain's email address",
		example:     AccountFixture.email,
		examples:    AccountFixture._examples.emails,
	}) email: string;

	/**
	 * Indicates whether the email associated with a user domain has been verified.
	 *
	 * @type {boolean}
	 */
	@ApiProperty({
		name:        "emailVerified",
		description: "Indicates whether the email associated with a user domain has been verified",
		example:     faker.datatype.boolean(),
	}) emailVerified: boolean;

	/**
	 * Represents a username.
	 * @typedef {string} username
	 */
	@ApiProperty({
		name:        "username",
		description: "The domain's username",
		example:     AccountFixture.username,
		examples:    AccountFixture._examples.usernames,
	}) username: string;
}