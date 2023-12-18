import {Account} from "../entities/account.js"



export type AccountId = Account['id'] & { readonly __brand: unique symbol };