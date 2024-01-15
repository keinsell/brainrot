import {
  Injectable,
  Logger,
  type OnApplicationBootstrap,
  type OnApplicationShutdown,
}                        from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Event }         from '../../libraries/message/event.js'
import { Message }       from '../../libraries/message/message.js'



@Injectable()
export class EventBus
  implements OnApplicationShutdown,
				 OnApplicationBootstrap
  {
	 private logger : Logger = new Logger( 'event_bus' )


	 constructor(private eventEmitter : EventEmitter2)
		{
		}


	 publish(event : Event)
		{
		  this.logger.debug(
			 `Publishing ${event.id} to namespace ${event.namespace} (${event.id}) => ${JSON.stringify( event )}` )

		  const hasListeners = this.eventEmitter.hasListeners( event.namespace )

		  if ( !hasListeners )
			 {
				this.logger.warn( `No listeners registered for ${event.namespace}` )
			 }

		  this.eventEmitter.emitAsync( event.namespace, event ).then( () => {
			 this.logger.verbose( `Published ${event.id} to ${event.namespace}` )
		  } )

		}


	 async publishAll(events : Event[])
		{
		  for ( const event of events )
			 {
				await this.publish( event )
			 }
		}

	 public onApplicationShutdown(signal? : string) : any
		{
		  this.logger.log( 'Received shutdown signal, unregistering all' + ' listeners...' )
		  this.eventEmitter.removeAllListeners()
		}

	 public onApplicationBootstrap() : any
		{
		  this.eventEmitter.onAny( (event : string) => {
			 this.logger.verbose( `Routing ${event}...` )
		  } )

		  const events = this.eventEmitter.eventNames()

		  for ( const eventName of events )
			 {
				this.logger.log( `Registered "${eventName.toString()}" namespace with ${this.eventEmitter.listenerCount(
				  eventName.toString() )} listeners.` )
			 }
		}


  }


export abstract class EventBusBase
  {
	 private messageBus : MessageBusBase


	 constructor(messageBus : MessageBusBase)
		{
		  this.messageBus = messageBus
		}


	 public async publish(event : Event) : Promise<void>
		{
		  await this.messageBus.publish( event )
		}


	 publishAll(events : any[]) : Promise<void>
		{
		  return this.messageBus.publishAll( events )
		}
  }


// TODO: Can have outbox pattern here
export abstract class MessageBusBase
  {
	 constructor()
		{
		}


	 abstract publish(message : Message) : Promise<void>


	 async publishAll(messages : Message[])
		{
		  for ( const message of messages )
			 {
				await this.publish( message )
			 }
		}
  }