import {faker} from "@faker-js/faker"



export const AccountFixture = {
	username:  faker.internet.userName(),
	email:     faker.internet.email(),
	password:  "SuperSecretPassword123!",
	_examples: {
		passwords: [
			"LaW1KVuo69FG5Pf",
			"9srQfkporSDhU76",
			"74ETrfy3OQCdUzs",
		],
		emails:    [
			"Raul_Marks@gmail.com",
			"Buddy.Schulist@gmail.com",
			"Anibal_Pouros@hotmail.com",
		],
		usernames: [
			"Raul_Marks",
			"Buddy.Schulist",
			"Anibal_Pouros",
		],
	},
}