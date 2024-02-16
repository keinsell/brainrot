import { BaseAggregateRoot } from '../../../kernel/libraries/domain/aggregate.js'
import { AccountId }         from '../../account/shared-kernel/account-id.js'
import { IPV4 }                  from '../../authentication/value-objects/ipv4.js'
import { SessionEvent }          from '../events/session-event.js'
import { SessionExpirationDate } from '../value-objects/session-expiration-date.js'
import { SessionStatus }         from '../value-objects/session-status.js'
import { UserAgent }             from '../value-objects/user-agent.js'

//User Identity: Sessions often include information about the authenticated user, such as their user ID, username, or
// email address. This is crucial for associating user-specific data and permissions with the session.  Authentication
// Token: A session may include an authentication token or session token that is used to verify the user's identity and
// ensure that they are authenticated for subsequent requests.  Roles and Permissions: Information about the user's
// roles and permissions within the application can be stored in the session. This data helps enforce access control
// and authorization rules.  User Preferences: Sessions can store user-specific preferences and settings, such as
// language preferences, theme choices, or notification settings.  Shopping Cart or Basket: In e-commerce applications,
// a session often includes a user's shopping cart or basket, allowing them to add and remove items as they shop.
// Session ID: A unique identifier for the session, which can be used to associate the session data with the user and
// manage session state on the server.  Last Activity Timestamp: To manage session expiration and inactivity, a
// timestamp indicating when the user's last activity occurred may be included.  Session Expiration Time: Sessions
// typically have a predefined expiration time to ensure that they do not persist indefinitely. This expiration time
// can be included in the session data.  Security Information: Information related to session security, such as IP
// address, user agent, and other data used for security checks and fraud prevention, may be included.

export interface SessionProperties
  {
	 /** unique identifier for the session */
	 id : string
	 /** The timestamp when the session started */
	 startTime : Date
	 /** The timestamp when the session ended. */
	 endTime : Date | null
	 subject : AccountId;
	 expiresAt : SessionExpirationDate;
	 userAgent? : UserAgent;
	 ipAddress? : IPV4;
	 location? : string;
	 device? : string;
	 status : SessionStatus
	 tokenId? : string
	 tokens? : string[]
  }


export class UserSession
  extends BaseAggregateRoot<string>
  implements SessionProperties
  {

	 public device : string
	 public endTime : Date | null
	 public expiresAt : SessionExpirationDate
	 public ipAddress : IPV4
	 public location : string
	 public startTime : Date
	 public status : SessionStatus
	 public subject : AccountId
	 public tokenId : string
	 public tokens : string[]
	 public userAgent : string


	 constructor(props : SessionProperties)
		{
		  super( props )
		  this.expiresAt = props.expiresAt
		  this.ipAddress = props.ipAddress as any
		  this.subject   = props.subject as any
		  this.userAgent = props.userAgent as any
		  this.endTime   = props.endTime as any
		  this.location  = props.location as any
		  this.device    = props.device as any
		  this.status    = props.status as any
		  this.tokenId   = props.tokenId as any
		  this.tokens    = props.tokens as any
		}


	 public static build(props : SessionProperties) : UserSession
		{
		  return new UserSession( {
											 ...props,
											 startTime : new Date(),
										  } )
		}


	 public RestoreSession(props : SessionProperties) : UserSession
		{
		  return new UserSession( props )
		}


	 public refreshSession(tokenId : string) : UserSession
		{
		  this.logger.log( `Refreshed with token ${tokenId}` )
		  this.tokens.push( tokenId )
		  return this
		}


	 public destroySession() : UserSession
		{
		  return this
		}


	 public startSession() : UserSession
		{
		  this.appendEvent( new SessionEvent.SessionCreated( this ) )
		  return this
		}
  }