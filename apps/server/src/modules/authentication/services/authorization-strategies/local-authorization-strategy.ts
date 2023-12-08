import {Injectable}          from '@nestjs/common';
import {PassportStrategy}    from '@nestjs/passport';
import {Strategy}            from 'passport-local';
import {CredentialValidator} from "../../../account/shared-kernel/credential-validator/credential-validator.js"



@Injectable()
export class LocalAuthorizationStrategy extends PassportStrategy(Strategy) {
	constructor(private credentialValidation: CredentialValidator) {
		super();
	}


// TODO: Validate credentials there with usage of credential validation instead generating a session
	async validate(username: string, password: string): Promise<any> {
		const user = await this.credentialValidation.validateCredentials(username.toLowerCase(), password);

		if (user.isErr()) {
			throw user.error
		} else {
			return user.value
		}
	}
}