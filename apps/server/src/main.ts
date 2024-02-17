import {bootstrap}            from './bootstrap.js'
import {__appConfig}          from './configs/global/__config.js'
import {isProduction}         from './configs/helper/is-production.js'
import {acquireProcessLock}   from './hooks/pre-start/acquire-process-lock.js'
import {initializeSentry}     from './hooks/pre-start/initialize-sentry.js'
import {ContainerEnvironment} from './hooks/pre-start/run-testcontainers.js'
import {
	prettyPrintServiceInformation,
	printSystemInfo,
}                             from './utilities/console-utils/index.js'

// TODO: Add check for minimal requirements to run server
// TODO: Run warn if host machine is too small
// Min. RAM = 512MB
// Min. CPU = 1x
// Recommended OS: Linux

await acquireProcessLock()

if (isProduction())
{
	printSystemInfo()
}

prettyPrintServiceInformation()

if (__appConfig.FEATURE_USE_DOCKER_TESTCONTAINERS)
{
	await ContainerEnvironment.run()
}

initializeSentry()

await bootstrap()


// This configuration should be parsed from configuration file or dotenv configuration,
// Then there should be key required for encryption of clientIds and clientSecrets, however,
// encryption may be required only for secrets as leaving clientIds unencrypted and publicly available to
// everyone with access to a database is "good enough" security.
// There should be ENV discovery implemented which will spot variables in format OAUTH_CLIENT_{IDP}_{VARIABLE}
// and automatically parse them into objects,
// then validate them and notify the administrator of the application if things are fine or something gone wrong.

/** Interface dedicated for adding OAuth 2.0 clients to application be used in SSO for example */
export interface OAuthClientConfig
{
	/** @example "github"
	 * @link [GitHub Developer Apps](https://github.com/settings/applications/new)
	 */
	IdP?: string
	/** @example "f2c6*****************" */
	clientId: string,
	/** @example "f90**************************************" */
	clientSecret?: string,
	discoverEndpoints: false,
	authority?: string,
	/** @example "https://api.github.com/user" */
	userinfoEndpoint?: string,
	/** @example "https://github.com/login/oauth/access_token" */
	tokenEndpoint?: string
	/** @example "https://github.com/login/oauth/authorize" */
	authorizationEndpoint?: string
	issuer?: string
	/** @example "openid email profile" */
	scope: string
	/** @example "http://localhost:1337/sso/github" */
	redirectUri: string
}




