import {CredentialValidator} from "../../../account/10-application/shared-kernel/credential-validator/credential-validator.js"
import {Authenticate}        from "../../application/authenticate.js"
import {TokenManagement}     from "../../services/token-management.js"
import {Session}             from "../entities/session.js"
import {SessionRepository}   from "../repositories/session-repository.js"



export class AuthenticationService {

	constructor(private credentialValidator: CredentialValidator, private tokenManagement: TokenManagement, private sessionRepository: SessionRepository) {}


	/**
	 * `authenticate`
	 * Operation that will take user credentials and create a new session related to his account.
	 * @param {Authenticate} authenticate
	 * @returns {Session}
	 */
	public async authenticate(authenticate: Authenticate): Promise<Session> {
		// TODO: Validate Credentials & Get account

		//const isValid = await this.credentialValidator.validateCredentials(username, password)
		//
		//if (isValid.isErr()) {
		//	throw isValid.error
		//}
		//
		//const account = isValid.value

		// TODO: Construct Value Objects
		// - User Agent
		// - IpAddress
		// - AccessToken
		// - SessionToken

		//const jwtPayload = new AccessToken({
		//	sub:      account.id,
		//	aud:      "aud",
		//	metadata: {
		//		email: account.email.address,
		//	},
		//})
		//
		//const accessToken  = new AccessToken(jwtPayload)
		//const refreshToken = new RefreshToken(jwtPayload)
		//
		//const signedAccessToken  = await this.tokenManagement.signAccessToken(accessToken)
		//const signedRefreshToken = await this.tokenManagement.signRefreshToken(refreshToken)

		//const session = Session.CreateSession({
		//	id: randomUUID(),
		//})
		//
		//const events = session.getUncommittedEvents()
		//
		//await new EventBus().publishAll(events)
		//
		//// TODO: Not implemented yet
		//
		//try {
		//	await this.sessionRepository.save(session)
		//} catch (e) {
		//	console.error(e)
		//}
		//
		//return ok({
		//	accountId:    account.id,
		//	accessToken:  signedAccessToken,
		//	refreshToken: signedRefreshToken,
		//})

		throw new Error("Not implemented")
	}


	public async refreshSession() {
		throw new Error("Not implemented")
	}


	public async destroySession(sessionId: string): Promise<void> {
		throw new Error("Not implemented")
	}
}