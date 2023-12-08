import {Injectable}        from "@nestjs/common"
import {PrismaService}     from "../../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {Session}           from "../../session/session.js"
import {SessionRepository} from "../domain/repositories/session-repository.js"



@Injectable()
export class PrismaSessionRepository extends SessionRepository {
	constructor(private prisma: PrismaService) {super()}


	public create(entity: Session): Promise<Session> {
		throw new Error("Not implemented")
	}


	public delete(entity: Session): Promise<void> {
		throw new Error("Not implemented")
	}


	public async exists(entity: Session): Promise<boolean> {
		const count = await this.prisma.session.count({
			where: {
				id: entity.id,
			},
		})

		return count > 0
	}


	public async findById(id: string): Promise<Session | undefined> {
		throw new Error("Not implemented")
	}


	public async update(entity: Session): Promise<Session> {
		throw new Error("Not implemented")
	}
}