import {Injectable}        from "@nestjs/common"
import {Session}           from "../entities/session.js"
import {SessionRepository} from "./session-repository.js"



@Injectable()
export class InMemorySessionRepository extends SessionRepository {
	private sessions: { [key: string]: Session } = {};

	public async create(entity: Session): Promise<Session> {
		this.sessions[entity.id] = entity;
		return entity;
	}

	public async delete(entity: Session): Promise<void> {
		delete this.sessions[entity.id];
	}

	public async exists(entity: Session): Promise<boolean> {
		return this.sessions[entity.id] !== undefined;
	}

	public async findById(id: string): Promise<Session | null> {
		return this.sessions[id] || null;
	}

	public async update(entity: Session): Promise<Session> {
		if (!this.sessions[entity.id]) {
			throw new Error('Session not found');
		}
		this.sessions[entity.id] = entity;
		return entity;
	}


	public async getByJti(jti: string): Promise<Session> {
		const session = Object.values(this.sessions).find(session => session.tokenId === jti)

		if (!session) {
			throw new Error("Session not found")
		}

		return session
	}
}