import {faker}          from "@faker-js/faker"
import {ApiProperty}    from "@nestjs/swagger"
import {ApiModel}       from "../../../../../../utilities/docs-utils/swagger-api-model.js"
import {AccountFixture} from "../../../../../../utilities/fixtures/account-fixture.js"



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
		example:     "",
		required:    false,
	}) id?: string;
	/**
	 * Represents an email address.
	 * @typedef {string} email
	 */
	@ApiProperty({
		name:        "email",
		description: "The account's email address",
		example:     AccountFixture.email,
		examples:    AccountFixture._examples.emails,
	}) email: string;
	/**
	 * Indicates whether the email associated with a user account has been verified.
	 *
	 * @type {boolean}
	 */
	@ApiProperty({
		name:        "emailVerified",
		description: "Indicates whether the email associated with a user account has been verified",
		example:     faker.datatype.boolean(),
	}) emailVerified: boolean;
	/**
	 * The password variable is a string that represents a user's password.
	 *
	 * @type {string}
	 */
	@ApiProperty({
		name:        "password",
		description: "The account's password",
		example:     AccountFixture.password,
		examples:    AccountFixture._examples.passwords,
	}) password: string;
	/**
	 * Represents a username.
	 * @typedef {string} username
	 */
	@ApiProperty({
		name:        "username",
		description: "The account's username",
		example:     AccountFixture.username,
		examples:    AccountFixture._examples.usernames,
	}) username: string;
}