import {IssueAutheorizationToken}  from '../dto/issue-autheorization-token.js'
import type {jsonwebtoken}         from '../dto/jsonwebtoken.js'
import {AuthenticationTokenId}     from '../value-object/authentication-token-id.js'
import {SignedAuthenticationToken} from '../value-object/signed-authentication-token.js'



export abstract class TokenManagement
	{
		abstract issueToken(payload: IssueAutheorizationToken): Promise<{
			signature: SignedAuthenticationToken,
			tokenId: AuthenticationTokenId
		}>

		abstract verifyToken(token: SignedAuthenticationToken): Promise<'VALID' | 'EXPIRED' | 'INVALID'>

		abstract revokeToken(tokenId: AuthenticationTokenId): Promise<void>

		abstract decodeToken(token: SignedAuthenticationToken): Promise<jsonwebtoken>
	}