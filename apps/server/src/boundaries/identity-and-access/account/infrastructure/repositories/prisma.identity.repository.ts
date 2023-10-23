import {Injectable, NotImplementedException} from "@nestjs/common"
import {Identity}                            from "../../domain/entities/identity.js"
import {IdentityRepository}                  from "../../domain/repositories/identity-repository.js"
import {Email}                               from "../../domain/value-objects/email.js"
import {Username}                            from "../../domain/value-objects/username.js"



@Injectable()
export class PrismaIdentityRepository implements IdentityRepository {
	public async findByEmail(email: Email): Promise<Identity> {
		throw new NotImplementedException(email)
	}

	public findByUsername(username: Username): Promise<Identity> {
		throw new NotImplementedException(username)
	}

	public getById(id: string): Promise<Identity> {
		throw new NotImplementedException(id)
	}

	public save(identity: Identity): Promise<Identity> {
		throw new NotImplementedException(identity)
	}

}