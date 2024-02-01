// TODO: Find available network port if preferred port is not available
// TODO: Pretty-print the application start message
// TODO: Initialize the application-wide logger
// TODO: Prepare tracing and profiling agents

import { acquireProcessLock } from '../../../hooks/pre-start/acquire-process-lock.js'
import { helloMessage }       from '../../../utilities/console-utils/index.js'



export class Boot
	 {
		  public static async loader()
				{
					 // Pretty-print the application start message
					 helloMessage()
					 // Lock PID of a process to prevent multiple instances of the same application
					 await acquireProcessLock()
					 
				}
	 }
