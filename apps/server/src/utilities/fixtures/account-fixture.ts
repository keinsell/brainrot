import {faker} from "@faker-js/faker"



export const AccountFixture = {
	username: faker.internet.userName(),
	email:    faker.internet.email(),
	password: faker.internet.password(),
}