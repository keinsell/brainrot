import {AggregateRoot}         from "../../../../common/libraries/domain/aggregate.js"
import {AccountId}             from "../../../account/shared-kernel/account-id.js"
import {SessionEvent}          from "../events/session-event.js"
import {IpAddress}             from "../value-objects/ip-address.js"
import {SessionExpirationDate} from "../value-objects/session-expiration-date.js"
import {SessionStatus}         from "../value-objects/session-status.js"
import {UserAgent}             from "../value-objects/user-agent.js"

//User Identity: Sessions often include information about the authenticated user, such as their user ID, username, or email address. This is crucial for associating user-specific data and permissions with the session.
//
//	Authentication Token: A session may include an authentication token or session token that is used to verify the user's identity and ensure that they are authenticated for subsequent requests.
//
//Roles and Permissions: Information about the user's roles and permissions within the application can be stored in the session. This data helps enforce access control and authorization rules.
//
//User Preferences: Sessions can store user-specific preferences and settings, such as language preferences, theme choices, or notification settings.
//
//	Shopping Cart or Basket: In e-commerce applications, a session often includes a user's shopping cart or basket, allowing them to add and remove items as they shop.
//
//Session ID: A unique identifier for the session, which can be used to associate the session data with the user and manage session state on the server.
//
//	Last Activity Timestamp: To manage session expiration and inactivity, a timestamp indicating when the user's last activity occurred may be included.
//
//Session Expiration Time: Sessions typically have a predefined expiration time to ensure that they do not persist indefinitely. This expiration time can be included in the session data.
//
//	Security Information: Information related to session security, such as IP address, user agent, and other data used for security checks and fraud prevention, may be included.

export interface SessionProps {
	/** unique identifier for the session */
	id: string
	/** The timestamp when the session started */
	startTime: Date
	/** The timestamp when the session ended. */
	endTime: Date | null
	subject: AccountId;
	expiresAt: SessionExpirationDate;
	userAgent?: UserAgent;
	ipAddress?: IpAddress;
	location?: string;
	device?: string;
	status: SessionStatus
}


export class Session extends AggregateRoot implements SessionProps {

	public expiresAt: Date
	public ipAddress: IpAddress
	public subject: AccountId
	public userAgent: string
	public device: string
	public endTime: Date | null
	public location: string
	public startTime: Date
	public status: SessionStatus


	constructor(props: SessionProps) {
		super(props)
		this.expiresAt = props.expiresAt
		this.ipAddress = props.ipAddress
		this.subject   = props.subject
		this.userAgent = props.userAgent
		this.endTime   = props.endTime;
		this.location  = props.location;
		this.device    = props.device;
	}


	public static CreateSession(props: SessionProps): Session {
		return new Session(props).startSession()
	}


	public RestoreSession(props: SessionProps): Session {
		return new Session(props)
	}


	public refreshSession(): Session {
		return this
	}


	public destroySession(): Session {
		return this
	}


	protected startSession(): Session {
		this.appendEvent(new SessionEvent.SessionCreated(this))
		return this
	}
}