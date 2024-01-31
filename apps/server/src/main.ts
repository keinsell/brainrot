import { bootstrap }            from './bootstrap.js'
import { __appConfig }          from './configs/global/__config.js'
import { isProduction }         from './configs/helper/is-production.js'
import {isTest}                 from './configs/helper/is-test.js'
import { acquireProcessLock }   from './hooks/pre-start/acquire-process-lock.js'
import { initializeSentry }     from './hooks/pre-start/initialize-sentry.js'
import { ContainerEnvironment } from './hooks/pre-start/run-testcontainers.js'
import {
  prettyPrintServiceInformation,
  printSystemInfo,
}                               from './utilities/console-utils/index.js'

// TODO: Add check for minimal requirements to run server
// TODO: Run warn if host machine is too small
// Min. RAM = 512MB
// Min. CPU = 1x
// Recommended OS: Linux

console.log(__appConfig.USE_TESTCONTAINERS)

await acquireProcessLock()



if ( isProduction() )
  {
	 printSystemInfo()
  }

prettyPrintServiceInformation()

if ( __appConfig.USE_TESTCONTAINERS )
  {
	 await ContainerEnvironment.run()
  }

initializeSentry()

await bootstrap()