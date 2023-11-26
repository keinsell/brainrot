import {DynamicModule, ForwardReference, Provider, Type} from "@nestjs/common";
import {NestFactory}                                     from "@nestjs/core";
import {SeederModule, SeederModuleOptions}               from "./seeder-module.js"
import {SeederV2}                                        from "./seeder-v2.js"
import {SeederService}                                   from "./services/seeder-service.js"



export interface SeederOptions {
	imports?: Array<
		Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
	>;
	providers?: Provider[];
}


export interface SeederRunner {
	run(seeders: Provider<SeederV2<unknown>>[]): void;
}


async function bootstrap(options: SeederModuleOptions) {
	const app            = await NestFactory.createApplicationContext(
		SeederModule.register(options),
	);
	const seedersService = app.get(SeederService);
	await seedersService.run();

	await app.close();
}


export const seeder = (options: SeederOptions): SeederRunner => {
	return {
		run(seeders: Provider<SeederV2>[]): void {
			bootstrap({
				...options,
				seeders,
			});
		},
	};
};