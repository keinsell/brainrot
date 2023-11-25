import {Session}           from "@boundary/identity-and-access/modules/authentication/domain/entities/session.js"
import {SessionRepository} from "@boundary/identity-and-access/modules/authentication/domain/repositories/session-repository.js"
import {Injectable}        from "@nestjs/common"
import {PrismaService}     from "../../../../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"



@Injectable()
export class PrismaSessionRepository extends SessionRepository {
	constructor(
		private prisma: PrismaService,
	) {super()}


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


	public async update(entity: Session): Promise<Session> {
		throw new Error("Not implemented")
	}
}