import { Logger }                  from '@nestjs/common'
import { isNil }                   from '@nestjs/common/utils/shared.utils.js'
import {
	 err,
	 ok,
}                                  from 'neverthrow'
import type { Tracer }             from '../../modules/observability/tracing/contract/tracer/tracer.js'
import type { AsyncResult }        from '../../result/async-result.js'
import { EntityNotFoundException } from '../entity/entity-not-found-exception.js'

// WriteRepository can:
// - Fetch an entity by unique identifier
// - Create an entity
// - Update an entity
// - Delete an entity
// WriteRepository cannot:
// - Fetch multiple entities
// - Fetch an entity by any other criteria than its unique identifier
// - Fetch an entity by multiple criteria
// - Fetch an entity by a criteria other than its unique identifier
// - Aggregate entities
// - List entities
// - Count entities

export type EntityLike = {
	 id : string | number | bigint
}



/**
 * Represents a generic write repository.
 *
 * @template T - The type of the entity.
 */
export abstract class WriteRepository<T extends EntityLike>
	 {
		  // TODO: Add RepositoryLoggerProxy
		  public logger : Logger
		  // TODO: Add RepositoryTracerProxy
		  public tracer : Tracer | undefined
		  public mapper : any
		  
		  constructor(
				dependencies : {
					 logger? : Logger,
					 tracer? : Tracer,
					 mapper? : any,
				},
		  )
				{
					 this.logger = dependencies.logger ?? new Logger( this.constructor.name.toLowerCase() )
					 this.tracer = dependencies.tracer
					 this.mapper = dependencies.mapper
				}
		  
		  
		  abstract create( entity : T ) : AsyncResult<T, Error>
		  
		  
		  abstract update( entity : T ) : AsyncResult<T, Error>
		  
		  
		  abstract delete( entity : T ) : AsyncResult<boolean, Error>
		  
		  
		  async exists( entity : T ) : AsyncResult<boolean, Error>
				{
					 const findByIdQuery = await this.findById( entity.id.toString() )
					 
					 const isFindByIdQueryErr = findByIdQuery.isErr()
					 
					 // Check against database error during the query
					 if ( isFindByIdQueryErr )
						  {
								return err( findByIdQuery.error )
						  }
					 
					 const entityOrNull = findByIdQuery.value
					 
					 // Check against missing entity
					 if ( isNil( entityOrNull ) )
						  {
								return ok( false )
						  }
					 
					 return ok( true )
				}
		  
		  
		  async save( entity : T ) : AsyncResult<T, Error>
				{
					 const doesExist = await this.exists( entity )
					 
					 if ( doesExist )
						  {
								return this.update( entity )
						  }
					 else
						  {
								return this.create( entity )
						  }
				}
		  
		  
		  abstract findById( id : string ) : AsyncResult<T | null, Error>
		  
		  
		  async getById( id : string ) : AsyncResult<T, EntityNotFoundException | Error>
				{
					 const findByIdQuery = await this.findById( id )
					 
					 const isFindByIdQueryErr = findByIdQuery.isErr()
					 
					 // Check against database error during the query
					 if ( isFindByIdQueryErr )
						  {
								return err( findByIdQuery.error )
						  }
					 
					 const entityOrNull = findByIdQuery.value
					 
					 // Check against missing entity
					 if ( isNil( entityOrNull ) )
						  {
								return err( new EntityNotFoundException( `Entity with id ${ id } not found` ) )
						  }
					 
					 return ok( entityOrNull )
				}
	 }
