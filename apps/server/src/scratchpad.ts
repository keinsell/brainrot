import 'reflect-metadata'
import {fakerEN}           from "@faker-js/faker"
import {NestFactory}       from "@nestjs/core"
import {env}               from "./configs/env.js"
import {Container}         from "./container.js"
import {AccountController} from "./modules/account/controllers/account.controller.js"



export async function main() {
	const app = await NestFactory.create(Container, {
		abortOnError: false,
		snapshot:     !!env.isDev,
	});

	app.listen(env.PORT)

	const email    = fakerEN.internet.email()
	const username = fakerEN.internet.userName()
	const password = fakerEN.internet.password()

	const account = await app.get(AccountController).register({
		email:    email,
		username: username,
		password: password,
	})

	console.log(account)
}


main()
.catch(console.error)
.finally(() => process.exit(0))