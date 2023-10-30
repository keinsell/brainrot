import {AccountEntityModel}                  from "@boundary/identity-and-access/account/infrastructure/persistence/account-entity-model.js"
import {Injectable, NotImplementedException} from "@nestjs/common"
import {DbContextModel}                      from "../../../../../infrastructure/storage/database/db-context-model.js"
import {PrismaService}                       from "../../../../../infrastructure/storage/database/prisma/prisma-service.js"
import {Account}                             from "../../domain/entities/account.js"
import {IdentityRepository}                  from "../../domain/repositories/identity-repository.js"
import {Email}                               from "../../domain/value-objects/email.js"
import {Username}                            from "../../domain/value-objects/username.js"



@Injectable()
export class PrismaIdentityRepository implements IdentityRepository {

	constructor(private prismaService: PrismaService) {}


	public async findByEmail(email: Email): Promise<Account | undefined> {
		const maybeAccount = await this.prismaService.account.findFirst({
			where: {
				username: email.address,
			},
		})

		if (!maybeAccount) {
			return undefined
		}

		const account = maybeAccount as DbContextModel.Account.Entity

		return new AccountEntityModel(account).toDomainModel()
	}


	public findByUsername(username: Username): Promise<Account> {
		throw new NotImplementedException(username)
	}


	public getById(id: string): Promise<Account> {
		throw new NotImplementedException(id)
	}


	public async save(identity: Account): Promise<Account> {
		const pendingAccount: DbContextModel.Account.CreatePayload = {
			username:                identity.username,
			password:                identity.password.hash,
			email:                   identity.email.address,
			emailVerificationStatus: identity.email.isVerified ? "VERIFIED" : "UNVERIFIED",
			salt:                    "",
		}

		const createdAccount = await this.prismaService.account.create({
			data: pendingAccount,
		}) as DbContextModel.Account.Entity

		const createdAccountModel = new AccountEntityModel(createdAccount)

		return createdAccountModel.toDomainModel()
	}
}