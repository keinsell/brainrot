import {DynamicModule, ForwardReference, Module, Provider, Type} from '@nestjs/common';
import {Seeder}                                                  from "./interfaces/seeder-interface.js"
import {SeederV2}                                                from "./seeder-v2.js"
import {SeederService}                                           from "./services/seeder-service.js"



export interface SeederModuleOptions {
	seeders: Provider<Seeder>[];
	imports?: Array<
		Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
	>;
	providers?: Provider[];
}


@Module({})
export class SeederModule {
	static register(options: SeederModuleOptions): DynamicModule {
		return {
			module:    SeederModule,
			imports:   options.imports || [],
			providers: [
				...(
					options.providers || []
				),
				...options.seeders,
				{
					provide:    SeederService,
					useFactory: (...seeders: SeederV2<any>[]): SeederService => {
						return new SeederService(seeders);
					},
					inject:     options.seeders as Type<any>[],
				},
			],
		};
	}
}