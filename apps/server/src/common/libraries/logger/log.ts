import { randomUUID } from 'node:crypto'
import { LogLevel }   from './log-level.js'



export interface LogPayload
  {
	 level : LogLevel;
	 message : string;
  }


export class Log
  {
	 id : string = randomUUID()
	 level : LogLevel
	 message : string


	 constructor(payload : LogPayload)
		{
		  this.level   = payload.level
		  this.message = payload.message
		}
  }
