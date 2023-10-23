import {Identity} from "../entities/identity.js"
import {Email}    from "../value-objects/email.js"
import {Username} from "../value-objects/username.js"



export abstract class IdentityRepository {
	abstract save(identity: Identity): Promise<Identity>

	abstract getById(id: string): Promise<Identity>

	abstract findByUsername(username: Username): Promise<Identity>

	abstract findByEmail(email: Email): Promise<Identity>
}