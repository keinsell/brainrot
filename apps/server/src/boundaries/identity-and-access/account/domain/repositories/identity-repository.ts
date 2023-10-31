import {Account}  from "../entities/account.js"
import {Email}    from "../value-objects/email.js"
import {Username} from "../value-objects/username.js"



export abstract class IdentityRepository {
	abstract save(identity: Account): Promise<Account>


	abstract getById(id: string): Promise<Account>


	abstract findByUsername(username: Username): Promise<Account | null>


	abstract findByEmail(email: Email): Promise<Account | null>
}