import {Injectable, NotImplementedException} from "@nestjs/common"
import {Identity}                            from "../entities/identity.js"



@Injectable()
export class IdentityRepository {
	async save(identity: Identity): Promise<Identity> {
		throw new NotImplementedException()
	}
}