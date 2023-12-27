import {Injectable, Logger}     from '@nestjs/common';
import {PassportStrategy}       from '@nestjs/passport';
import {Strategy}               from 'passport-local';
import {censorString}           from "../../../../utilities/console-utils/censor-string.js"
import {CredentialValidator}    from "../../../account/shared-kernel/credential-validator/credential-validator.js"
import {AuthenticationStrategy} from "../api/authentication-strategy.js"



@Injectable()
export class LocalAuthorizationStrategy
	extends PassportStrategy(Strategy)
	implements AuthenticationStrategy {
	private logger : Logger = new Logger("authorization::strategy::local")


	constructor(private credentialValidation : CredentialValidator) {
		super();
	}


	async validate(username : string, password : string) : Promise<any> {
		this.logger.verbose(`User "${username}" is trying to authenticate with "${censorString(password)}"`)

		const user = await this.credentialValidation.validateCredentials(username.toLowerCase(), password);

		if (user.isErr()) {
			this.logger.debug(`Authorization failed: ${JSON.stringify(user.error)}`)
			throw user.error
		}
		else {
			this.logger.debug(`Authenticated user ${user.value.id}`)
			return user.value
		}
	}
}