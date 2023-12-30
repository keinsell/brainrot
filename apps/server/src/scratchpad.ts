import 'reflect-metadata'



export async function main() {
	// const app = await NestFactory.create(Container, {
	// 	abortOnError: false,
	// 	snapshot:     !!env.isDev,
	// });
	//
	// app.listen(env.PORT)
	//
	// const email    = fakerEN.internet.email()
	// const username = fakerEN.internet.userName()
	// const password = fakerEN.internet.password()
	//
	// const account = await app.get(AccountController).register({
	// 	email:    email,
	// 	username: username,
	// 	password: password,
	// })
	//
	// console.log(account)
}


main()
.catch(console.error)
.finally(() => process.exit(0))