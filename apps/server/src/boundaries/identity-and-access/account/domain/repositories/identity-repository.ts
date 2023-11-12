import {Account}           from "@boundary/identity-and-access/account/domain/aggregates/account.js"
import {GenericRepository} from "../../../../../libraries/persistence/repository/repository.js"
import {Email}             from "../value-objects/email.js"
import {Username}          from "../value-objects/username.js"



export abstract class IdentityRepository extends GenericRepository<Account> {
	abstract save(identity: Account): Promise<Account>


	abstract getById(id: string): Promise<Account>


	abstract findByUsername(username: Username): Promise<Account | null>


	abstract findByEmail(email: Email): Promise<Account | null>

	abstract findByUsernameFields(username: string): Promise<Account | null>
}