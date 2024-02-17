// InitiateSingleSignOn
import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
}                     from '@nestjs/common'
import {ApiOperation} from '@nestjs/swagger'


// IdP
// Do IdPs should be stored in database? They are kinda known from OAuthClient entity.
type IdentityProvider = 'google'


export interface InitiateSingleSignOn
{
	provider: IdentityProvider
	redirectUrl?: string
}


export interface SingleSignOnInitiationResponse
{
	url: string
}


export interface CompleteSsoRequest
{
	token: string
}


export interface CompletedSingleSignOnResponse
{
	accessToken: string
	refreshToken: string
}


export interface SingleSignOnService
{
	initiate(payload: InitiateSingleSignOn): Promise<SingleSignOnInitiationResponse>

	complete(payload: CompleteSsoRequest): Promise<CompletedSingleSignOnResponse>
}


/**
 * SSO (Single Sign-On): Allow users to sign in with a single ID to access multiple related applications.
 */
@Controller('/auth/sso')
export class SsoController
{

	@ApiOperation({
		              operationId: 'initiate-sso',
	              }) @Get(':idp') initiateSingleSignOn(@Param('idp') identityProvider: string, @Body() body: InitiateSingleSignOn): SingleSignOnInitiationResponse
	{
		// Get OAuthClientService
		// Query requested identity provider
		// Throw or use oauth2 client

		if (!identityProvider || identityProvider !== 'test')
		{
			throw new NotFoundException('Requested provider not found.')
		}

		// Use OAuth2 Client to initialize signing (get redirect url)
		// Return URL for user
		return {
			url: '',
		}
	}

	@ApiOperation({
		              operationId: 'complete-sso',
	              }) @Post(':idp') completeSingleSignOn(@Param('idp') identityProvider: IdentityProvider, @Body() body: CompleteSsoRequest): CompletedSingleSignOnResponse
	{
		// Get OAuthClientService
		// Query requested identity provider
		// Throw or use oauth2 client
		// Use OAuth2 Client to validate token provided by user
		// Validate if account exists, create if not
		// Generate mine own JWTs?
		return {
			accessToken : '',
			refreshToken: '',
		}
	}
}
