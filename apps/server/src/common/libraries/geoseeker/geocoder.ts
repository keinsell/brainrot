// https://gist.github.com/joyrexus/6510992
import {Address} from "../address/address.js"



export interface GeocoderProvider {

}


export abstract class Geocoder {
	private providers: GeocoderProvider[] = [];


	abstract geocode(query: any): Promise<Address[]>;


	abstract reverse(query: any): Promise<Address[]>;


	abstract suggest(query: any): Promise<any[]>;


	registerProvider(provider: GeocoderProvider) {
		this.providers.push(provider);
	}


	getFirstProvider(): GeocoderProvider {
		return this.providers[0];
	}
}