import {Account} from "@boundary/identity-and-access/account/domain/aggregates/account.js"



export type AccountId = Account['id'] & { readonly __brand: unique symbol };