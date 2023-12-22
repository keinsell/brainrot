import {Injectable}        from "@nestjs/common"
import {PrismaService}     from "../../../common/modules/storage/prisma/services/prisma-service.js"
import {UserSession}       from "../../session/entities/user-session.js"
import {SessionRepository} from "./session-repository.js"



@Injectable()
export class PrismaSessionRepository extends SessionRepository {
	constructor(private prisma: PrismaService) {super()}


	public create(entity: UserSession): Promise<UserSession> {
		throw new Error("Not implemented")
	}


	public delete(entity: UserSession): Promise<void> {
		throw new Error("Not implemented")
	}


	public async exists(entity: UserSession): Promise<boolean> {
		const count = await this.prisma.session.count({
			where: {
				id: entity.id,
			},
		})

		return count > 0
	}


	public async findById(id: string): Promise<UserSession | undefined> {
		throw new Error("Not implemented")
	}


	public async update(entity: UserSession): Promise<UserSession> {
		throw new Error("Not implemented")
	}
}