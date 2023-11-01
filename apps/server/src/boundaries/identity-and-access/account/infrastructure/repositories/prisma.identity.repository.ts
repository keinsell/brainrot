import {Account}                                     from "@boundary/identity-and-access/account/domain/aggregates/account.js"
import {AccountWriteModel}                           from "@boundary/identity-and-access/account/infrastructure/persistence/account-write-model.js"
import {AccountEntityModel}                          from "@boundary/identity-and-access/account/infrastructure/persistence/account/account-entity-model.js"
import {Injectable, Logger, NotImplementedException} from "@nestjs/common"
import {DbContextModel}                              from "../../../../../infrastructure/storage/database/db-context-model.js"
import {PrismaService}                               from "../../../../../infrastructure/storage/database/prisma/prisma-service.js"
import {IdentityRepository}                          from "../../domain/repositories/identity-repository.js"
import {Email}                                       from "../../domain/value-objects/email.js"
import {Username}                                    from "../../domain/value-objects/username.js"



@Injectable()
export class PrismaIdentityRepository implements IdentityRepository {
	private logger: Logger = new Logger("account:repository:prisma")


	constructor(private prismaService: PrismaService) {}


	public async findByEmail(email: Email): Promise<Account | undefined> {
		const maybeAccount = await this.prismaService.account.findFirst({
			where: {
				email: email.address,
			},
		})

		this.logger.verbose(`findByEmail(${email.address}) => ${JSON.stringify(maybeAccount)}`)

		if (!maybeAccount) {
			return undefined
		}

		const account = maybeAccount as DbContextModel.Account.Entity

		return new AccountEntityModel(account).toDomainModel()
	}


	public async findByUsername(username: Username): Promise<Account | undefined> {
		let maybeAccount: DbContextModel.Account.Entity | null = null

		try {
			maybeAccount = await this.prismaService.account.findFirst({
				where: {
					username: username,
				},
			}) as DbContextModel.Account.Entity | null
		} catch (e) {
			this.logger.error(e)
		}

		this.logger.verbose(`findByUsername(${username}) => ${JSON.stringify(maybeAccount)}`)

		if (!maybeAccount) {
			return undefined
		}

		const account = maybeAccount

		return new AccountEntityModel(account).toDomainModel()
	}


	public getById(id: string): Promise<Account> {
		throw new NotImplementedException(id)
	}


	public async save(identity: Account): Promise<Account> {
		let entity: DbContextModel.Account.Entity

		try {
			entity = await this.prismaService.account.create({
				data: AccountWriteModel.fromDomainModel(identity),
			}) as DbContextModel.Account.Entity
		} catch (e) {
			this.logger.error(e)
			throw e
		}

		return new AccountEntityModel(entity).toDomainModel()
	}


	public async create(identity: Account): Promise<Account> {
		let entity: DbContextModel.Account.Entity

		try {
			entity = await this.prismaService.account.create({
				data: AccountWriteModel.fromDomainModel(identity),
			}) as DbContextModel.Account.Entity
		} catch (e) {
			this.logger.error(e)
			throw e
		}

		return new AccountEntityModel(entity).toDomainModel()
	}


	public delete(entity: Account): Promise<void> {
		return Promise.resolve(undefined)
	}


	public update(entity: Account): Promise<Account> {
		return Promise.resolve(undefined)
	}
}