import {Injectable, Logger}    from '@nestjs/common'
import {PassportStrategy}       from '@nestjs/passport'
import {setUser}                from '@sentry/node'
import {Strategy}               from 'passport-local'
import {OpentelemetryTracer}    from '../../../../kernel/modules/observability/tracing/opentelemetry/provider/tracer/opentelemetry-tracer.js'
import {censorString}           from '../../../../utils/console-utils/censor-string.js'
import {CredentialValidator}    from '../../../account/shared-kernel/credential-validator/credential-validator.js'
import {AuthenticationStrategy} from '../../contract/authentication-strategy/authentication-strategy.js'



@Injectable()
export class LocalAuthorizationStrategy extends PassportStrategy(Strategy) implements AuthenticationStrategy {
	private logger: Logger = new Logger('authorization::strategy::local')


	constructor(private credentialValidation: CredentialValidator) {
		super()
	}


	async validate(username: string, password: string): Promise<any> {
		const span = new OpentelemetryTracer().startSpan('con.methylphenidate.authentication.local', {
			attributes: {
				'op':   'function',
				'name': 'LocalAuthorizationStrategy.validate',
			},
		})

		span.setAttribute('user_username', username)
		span.setAttribute('user.username', username)

		this.logger.verbose(`User "${username}" is trying to authenticate with "${censorString(password)}"`)

		const user = await this.credentialValidation.validateCredentials(username.toLowerCase(), password)

		if (user.isErr()) {
			span.end()
			this.logger.debug(`Authorization failed: ${JSON.stringify(user.error)}`)
			throw user.error
		} else {
			this.logger.debug(`Authenticated user ${user.value.id}`)

			span.addEvent('authenticated')
			span.setAttribute('user_id', user.value.id)
			span.setAttribute('user.id', user.value.id)

			span.end()

			setUser({
				id:       user.value.id,
				username: user.value.username,
				email:    user.value.email.address,
			})

			return user.value
		}
	}
}