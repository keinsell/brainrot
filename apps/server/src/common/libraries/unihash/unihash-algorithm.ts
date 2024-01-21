import { Logger } from '@nestjs/common'

import { isDevelopment }         from '../../../configs/helper/is-development.js'
import { OpentelemetryTracer }   from '../../modules/observability/tracing/opentelemetry/provider/tracer/opentelemetry-tracer.js'
import { KeyDerivationFunction } from './key-derivation-functions/key-derivation-function.js'
import {
  PhcString,
  SerializedPhcString,
}                                from './types/phc-string.js'
import { Salt }                  from './types/salt.js'



export class UnihashAlgorithm
  {
	 private readonly tracer : OpentelemetryTracer = new OpentelemetryTracer()
	 private readonly logger : Logger

	 constructor(private readonly kdf : KeyDerivationFunction)
		{
		  this.logger = new Logger( `${kdf.name}` )
		}


	 async hash(
		plain : string,
		salt? : Salt,
	 ) : Promise<SerializedPhcString>
		{
		  const span = this.tracer.startSpan( `${this.kdf.name}::hash` )
		  this.preHash( plain )
		  const phcString = await this.kdf.deriveKey( plain, salt as any )
		  this.postHash( plain, phcString.serialize() )
		  span.end()
		  return phcString.serialize()
		}


	 async verify(
		hash : string,
		plain : string,
	 ) : Promise<boolean>
		{
		  const span = this.tracer.startSpan( `${this.kdf.name}::verify` )
		  this.preVerify( hash, plain )
		  const result = await this.kdf.verify( PhcString.deserialize( hash as unknown as SerializedPhcString ), plain )
		  this.postVerify( hash, plain, result )
		  span.end()
		  return result
		}


	 private preHash(plain : string) : void
		{
		  this.logger.verbose( `hash(${this.maskPassword( plain )})` )
		}


	 private postHash(
		plain : string,
		hash : string,
	 ) : void
		{
		  this.logger.debug( `hash(${this.maskPassword( plain )}) => ${this.formatHash( hash )}` )
		}


	 private preVerify(
		hash : string,
		plain : string,
	 ) : void
		{
		  this.logger.verbose( `verify(${this.maskPassword( plain )}, ${this.formatHash( hash )})` )
		}


	 private postVerify(
		hash : string,
		plain : string,
		result : boolean,
	 ) : void
		{
		  this.logger.debug(
			 `verify(${this.maskPassword( plain )},${this.formatHash( hash )}) => ${result ? 'OK' : 'FAIL'}` )
		}


	 private maskPassword(plain : string) : string
		{
		  return isDevelopment() ? plain : '[REDACTED]'
		  //		return plain.slice(0, 3) + "#".repeat(plain.length - 3)
		}


	 /** Return last 20 characters of hash */
	 private formatHash(hash : string) : string
		{
		  return `${hash.slice( 0, 10 )}...${hash.slice( hash.length - 10 )}`
		}
  }