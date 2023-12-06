import {Repository} from "../../../common/libraries/storr/index.js"
import {Account}    from "../account.js"
import {Email}      from "../value-objects/email.js"
import {Username}   from "../value-objects/username.js"



export abstract class AccountRepository extends Repository<Account> {
	abstract getById(id: string): Promise<Account>


	abstract findByUsername(username: Username): Promise<Account | null>


	abstract findByEmail(email: Email): Promise<Account | null>


	abstract findByUsernameFields(username: string): Promise<Account | null>
}