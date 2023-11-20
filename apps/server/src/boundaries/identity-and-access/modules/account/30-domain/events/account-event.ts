import {AccountAuthenticated} from "@boundary/identity-and-access/modules/account/30-domain/events/account-authenticated.js"
import {AccountRegistered}    from "@boundary/identity-and-access/modules/account/30-domain/events/account-registered.js"



export const AccountEvent = {
	Registred:     AccountRegistered,
	Authenticated: AccountAuthenticated,
}