import {DbContextModel} from "../../../../common/infrastructure/storage/database/db-context-model.js"
import {Prisma}         from "../../../../vendor/prisma/index.js"
import {Session}        from "../../entities/session.js"



export class SessionCreateModel implements DbContextModel.Session.CreatePayload {
	public Account: Prisma.AccountCreateNestedOneWithoutSessionsInput
	public createdAt?: Date | string
	public id: string

	constructor(payload: DbContextModel.Session.CreatePayload) {
		Object.assign(this, payload)
	}

	static fromDomainModel(session: Session): SessionCreateModel {
		return new SessionCreateModel({
			id: session.id,
			Account: {
				connect: {
					id: session.subject
				},
			},
		})
	}
}