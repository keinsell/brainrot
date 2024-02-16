import {Repository}  from "../../../kernel/libraries/storage/index.js"
import {UserSession} from "../entities/user-session.js"



export abstract class SessionRepository extends Repository<UserSession> {
	public abstract getByJti(jti: string): Promise<UserSession>
}