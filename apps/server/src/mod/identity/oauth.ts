import {OptionPredicator} from 'typia/lib/programmers/helpers/OptionPredicator.js'
import undefined = OptionPredicator.undefined



export interface Account
{
	id: string
	password: string
	username: string
}


// OAuth was created to remove the need for users to share their passwords with third-party applications. It actually
// started as a way to solve an OpenID problem: if you support OpenID on your site, you can't use HTTP Basic
// credentials (username and password) to provide an API because the users don't have a password on your site.


// The main design consideration was to store or not store OAuth 2.0 Clients in database,
// eventually come up to conclusion
// where they should be stored in a database
// as this do not require
// exposing thousands of endpoints for the same fucking thing
// as it's commonly presented by all of these india suckers - people will complain it's not secure to store such
// information in database - ofc it's not, but it can be made secure by asynchronous encryption or secret store, so it's
// not really that big deal.
// FFs, I just wanted to see one "correct" by book implementation,
// but I guess this code can be now called "IAM Solution" by Today's standards.
export interface OAuthClient
{
	id: string
	name: 'google'
	authority: string
	clientId: string
	clientSecret: string
	redirectUri: string
	scope: string
}


export interface OauthToken
{
	id: string
	type: 'Bearer'
	accessToken: string
	refreshToken: string
	accountId: string
}


// OpenID was created for federated authentication, that is, letting a third party authenticate your users for you, by
// using accounts they already have. The term federated is critical here because the whole point of OpenID is that any
// provider can be used (except allowlists). You don't need to pre-choose or negotiate a deal with the
// providers to allow users to use any other account they have.

export interface OIDC
{
	id: string
}


/**
 * The name of the external identity provider that manages the user's identity. This should be a string value, such as
 * "google", "facebook", or "github".
 */
type IdentityProvider = 'google'


export interface FederatedIdentity
{
	id: string
	// Internal Account ID
	accountId: string
	provider: IdentityProvider
	/** The unique identifier for the user's identity within the external identity provider.
	 * This should be a string value that is provided by the IdP.
	 */
	provider_id: string
	email: string
	name: string
	/** The URL of the user's profile picture, as provided by the external identity provider.
	 * This should be a string value.
	 *
	 */
	picture?: string
	accessToken: string
	refreshToken: string
	expiresAt: Date
	createdAt: Date
	updatedAt: Date
}


export interface OAuthClientService
{
	getClientByIdP(idp: IdentityProvider): OAuthClient

	getClientById(id: string): OAuthClient

	deleteClientById(id: string): OAuthClient

	storeClient(client: OAuthClient): OAuthClient
}


export interface OAuthService
{
	client: OAuthClient

	initiateAuthenticationFlow(scope?: string, state?: string): URL

	completeAuthenticationFlow(authorizationCode: string, redirectUri: URL): OauthToken
}


export class OAuthClientManagementService
	implements OAuthClientService
{
	private clientStore: OAuthClient[] = []

	public deleteClientById(id: string): OAuthClient
	{
		return undefined
	}

	public getClientById(id: string): OAuthClient
	{
		return undefined
	}

	public getClientByIdP(idp: IdentityProvider): OAuthClient
	{
		return undefined
	}

	public storeClient(client: OAuthClient): OAuthClient
	{
		return undefined
	}

}
