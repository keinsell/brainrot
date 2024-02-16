import {bootstrap}                                      from './bootstrap.js'
import {__appConfig}                                    from './conf/global/__config.js'
import {isProduction}                                   from './conf/helper/is-production.js'
import {acquireProcessLock}                             from './kernel/hooks/pre-start/acquire-process-lock.js'
import {initializeSentry}                               from './kernel/hooks/pre-start/initialize-sentry.js'
import {ContainerEnvironment}                           from './kernel/hooks/pre-start/run-testcontainers.js'
import {prettyPrintServiceInformation, printSystemInfo} from './utils/console-utils/index.js'

// TODO: Add check for minimal requirements to run server
// TODO: Run warn if host machine is too small
// Min. RAM = 512MB
// Min. CPU = 1x
// Recommended OS: Linux

await acquireProcessLock()

if (isProduction()) {
	printSystemInfo()
}

prettyPrintServiceInformation()

if (__appConfig.FEATURE_USE_DOCKER_TESTCONTAINERS) {
	await ContainerEnvironment.run()
}

initializeSentry()

await bootstrap()