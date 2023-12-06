import {Account} from "../../../../domain/account/account.js"



export type AccountId = Account['id'] & { readonly __brand: unique symbol };