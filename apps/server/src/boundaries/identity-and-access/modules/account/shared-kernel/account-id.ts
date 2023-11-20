import {Account} from "@boundary/identity-and-access/modules/account/30-domain/aggregates/account.js"



export type AccountId = Account['id'] & { readonly __brand: unique symbol };