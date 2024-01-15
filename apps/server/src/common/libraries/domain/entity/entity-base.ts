// TODO: https://linear.app/keinsell/issue/PROD-95/add-entity-base-class
import { randomUUID }       from 'node:crypto'
import { EventBus }         from '../../../modules/messaging/event-bus.js'
import type { UUIDV4 }      from '../../identification/index.js'
import { Repository }       from '../../storage/repository/repository.js'
import { AggregateLogger }  from '../aggregate-logger.js'
import type { DomainEvent } from '../domain-event.js'



export class EntityBase<ID_TYPE = UUIDV4>
  {
	 protected logger : AggregateLogger
	 private readonly _createdAt : Date
	 private _singularName? : string
	 private _pluralName? : string
	 private forwardRefName? : string
	 /**
	  * Array that holds events data.
	  *
	  * @type {Array<any>}
	  */
	 private _events : Array<any | DomainEvent<this, any>> = []
	 private readonly _id : ID_TYPE

	 constructor(identifier : ID_TYPE)
		{
		  this._id        = identifier ?? randomUUID() as ID_TYPE
		  this.logger     = new AggregateLogger( this )
		  this._createdAt = new Date()
		  this._updatedAt = new Date()
		  this.logger.verbose( `Constructed Aggregate` )
		}

	 private _updatedAt : Date

	 get updatedAt() : Date
		{
		  return this._updatedAt
		}

	 get id() : ID_TYPE
		{
		  return this._id
		}

	 private _version : number = 1

	 get version() : number
		{
		  return this._version
		}

	 get createdAt() : Date
		{
		  return this._createdAt
		}

	 /** Commits changes done on specific entity to the repository and publishes changes to other modules. */
	 public async commit(
		repository : Repository<this>,
		bus? : EventBus,
	 ) : Promise<void>
		{
		  this.bumpVersion()
		  this.bumpUpdateDate()

		  await repository.save( this )

		  if ( !bus )
			 {
				console.warn( 'Event bus is not provided. Events will not be published.' )
				return
			 }

		  await bus.publishAll( this.getUncommittedEvents() )
		}

	 /**
	  * Retrieves the uncommitted events.
	  *
	  * @returns {Array} An array containing the uncommitted events.
	  */
	 public getUncommittedEvents()
		{
		  const eventsSnapshot = this._events.slice()

		  // Remove events from aggregate as we already have a copy of them.
		  this._events = []

		  // Filter snapshot to only include pending events.
		  return eventsSnapshot
		}

	 /** Handle command in reflection-based method which will search an inter-class references for specific command and execute method basing on information from command. This method is used to handle commands in aggregates. */
	 public handleCommand(command : any)
		{
		  throw new Error( 'Method not implemented.' + command )
		}

	 public __clearEvents() : this
		{
		  this._events = []
		  return this
		}

	 protected bumpVersion()
		{
		  this._version = this._version + 1
		  this.logger   = new AggregateLogger( this )
		}

	 protected appendEvent(event : any)
		{
		  this.bumpVersion()
		  this.bumpUpdateDate()
		  this._events.push( event )
		  this.logger.verbose( `${event.id} stored in aggregate.` )
		}

	 private bumpUpdateDate()
		{
		  this._updatedAt = new Date()
		}
  }