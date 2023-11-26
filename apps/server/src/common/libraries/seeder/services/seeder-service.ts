import {Injectable} from "@nestjs/common";
import {SeederV2}   from "../seeder-v2.js"



@Injectable()
export class SeederService {
	constructor(private readonly seeders: SeederV2<unknown>[]) {}


	async run(): Promise<any> {
		if (this.shouldRefresh()) await this.drop();
		return this.seed();
	}


	async seed(): Promise<any> {
		// Don't use `Promise.all` during insertion.
		// `Promise.all` will run all promises in parallel which is not what we want.
		for (const seeder of this.seeders) {
			await seeder.seed();
		}
	}


	async drop(): Promise<any> {
		return;
	}


	shouldRefresh(): boolean {
		const argv = process.argv;
		return argv.includes("-r") || argv.includes("--refresh");
	}
}