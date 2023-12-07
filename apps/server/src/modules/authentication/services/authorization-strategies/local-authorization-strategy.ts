import {Injectable}             from '@nestjs/common';
import {PassportStrategy}       from '@nestjs/passport';
import {Strategy}               from 'passport-local';
import {AuthenticationStrategy} from "../../domain/services/authentication-strategy.js"



@Injectable()
export class LocalAuthorizationStrategy extends PassportStrategy(Strategy) implements AuthenticationStrategy {
	constructor() {
		super();
	}


	async validate(username: string, password: string): Promise<any> {
		return;
	}
}