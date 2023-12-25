import {Opaque}  from "type-fest"
import {Account} from "../entities/account.js"



export type AccountId = Opaque<Account["id"]>