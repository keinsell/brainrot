import {Repository} from "../../../common/libraries/storr/index.js"
import {Session}    from "../entities/session.js"



export abstract class SessionRepository extends Repository<Session>{
	public abstract getByJti(jti: string): Promise<Session>
}