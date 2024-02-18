import {bootstrap}            from './bootstrap.js'
import {__appConfig}          from './configs/global/__config.js'
import {isProduction}         from './configs/helper/is-production.js'
import {acquireProcessLock}   from './hooks/pre-start/acquire-process-lock.js'
import {initializeSentry}     from './hooks/pre-start/initialize-sentry.js'
import {ContainerEnvironment} from './hooks/pre-start/run-testcontainers.js'
import {discoverSSOClients}   from './kernel/modules/configuration/oauth-config.js'
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

console.log(discoverSSOClients())
