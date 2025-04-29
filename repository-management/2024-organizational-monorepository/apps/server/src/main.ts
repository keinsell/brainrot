import {env}                from 'node:process'
import os                   from 'os'
import {bootstrap}          from './bootstrap.js'
import {isProduction}       from './configs/helper/is-production.js'
import {acquireProcessLock} from './hooks/pre-start/acquire-process-lock.js'
import {initializeSentry}   from './hooks/pre-start/initialize-sentry.js'
import {
	prettyPrintServiceInformation,
	printSystemInfo,
}                           from './utilities/console-utils/index.js'



const THREAD_TO_CPU_RATIO = 1.5
env.UV_THREADPOOL_SIZE    = Math.ceil(Math.max(4, os.cpus().length * THREAD_TO_CPU_RATIO))

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

//await prepareContainerizedDevelopmentEnvironment()

initializeSentry()

await bootstrap()
