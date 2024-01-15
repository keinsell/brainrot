import { Message }     from './message.js'
import { MessageType } from './values/message-type.js'



export class Event<BODY = unknown>
  extends Message<BODY>
  {
	 override type : MessageType = MessageType.EVENT


	 constructor(payload : Omit<Message<BODY>, 'id' | 'timestamp' | 'type'>)
		{
		  super( {
					  ...payload,
					} )
		  Object.assign( this, payload )
		  this.id = this.generateIdWithNamespace( this.type )
		}
  }