import {Injectable}        from "@nestjs/common"
import {UserSession}       from "../entities/user-session.js"
import {SessionRepository} from "./session-repository.js"



@Injectable()
export class InMemorySessionRepository extends SessionRepository {
	private sessions: { [key: string]: UserSession } = {};

	public async create(entity: UserSession): Promise<UserSession> {
		this.sessions[entity.id] = entity;
		return entity;
	}

	public async delete(entity: UserSession): Promise<void> {
		delete this.sessions[entity.id];
	}

	public async exists(entity: UserSession): Promise<boolean> {
		return this.sessions[entity.id] !== undefined;
	}

	public async findById(id: string): Promise<UserSession | null> {
		return this.sessions[id] || null;
	}

	public async update(entity: UserSession): Promise<UserSession> {
		if (!this.sessions[entity.id]) {
			throw new Error('Session not found');
		}
		this.sessions[entity.id] = entity;
		return entity;
	}


	public async getByJti(jti: string): Promise<UserSession> {
		const session = Object.values(this.sessions).find(session => session.tokenId === jti)

		if (!session) {
			throw new Error("Session not found")
		}

		return session
	}
}