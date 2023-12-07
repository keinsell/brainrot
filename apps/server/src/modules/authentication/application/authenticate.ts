import {faker}          from "@faker-js/faker"
import {ApiProperty}    from "@nestjs/swagger"
import {ApiModel}       from "../../../utilities/docs-utils/swagger-api-model.js"
import {AccountFixture} from "../../../utilities/fixtures/account-fixture.js"



@ApiModel({
	name:        "Auhenticate",
	description: "asdasd",
})
export class Authenticate {
	/**
	 * Represents a username.
	 * @typedef {string} username
	 */
	@ApiProperty({
		name:        "username",
		description: "The domain's username",
		example:     AccountFixture.username,
		examples:    [
			faker.internet.userName(), faker.internet.userName(),
			faker.internet.userName(),
		],
	}) username: string;

	/**
	 * The password variable is a string that represents a user's password.
	 *
	 * @type {string}
	 */
	@ApiProperty({
		name:        "password",
		description: "The domain's password",
		example:     AccountFixture.password,
		examples:    [
			faker.internet.password(), faker.internet.password(),
			faker.internet.password(),
		],
	}) password: string;
}