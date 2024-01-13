import {AuthenticationTokenId}     from "../value-object/authentication-token-id.js";
import {SignedAuthenticationToken} from "../value-object/signed-authentication-token.js";
import {AuthenticationToken}       from "../entity/authentication-token.js";
import {IssueAutheorizationToken}  from "../dto/issue-autheorization-token.js";



export abstract class TokenManagement {
	abstract issueToken(payload : IssueAutheorizationToken) : Promise<SignedAuthenticationToken>

	abstract verifyToken(token : SignedAuthenticationToken) : Promise<"VALID" | "EXPIRED" | "INVALID">

	abstract revokeToken(tokenId : AuthenticationTokenId) : Promise<void>

	abstract decodeToken(token : SignedAuthenticationToken) : Promise<AuthenticationToken>
}