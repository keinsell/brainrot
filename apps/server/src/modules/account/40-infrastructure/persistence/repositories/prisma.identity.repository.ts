import {Injectable, Logger, NotImplementedException} from "@nestjs/common"
import {PrismaService}                               from "../../../../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {DbContextModel}                              from "../../../../../common/infrastructure/storage/database/db-context-model.js"
import {Account}                                     from "../../../../../domain/account/account.js"
import {AccountRepository}                           from "../../../../../domain/account/repositories/account-repository.js"
import {Email}                                       from "../../../../../domain/account/value-objects/email.js"
import {Username}                                    from "../../../../../domain/account/value-objects/username.js"
import {AccountCreateModel}                          from "../models/account/account-create-model.js"
import {AccountEntityModel}                          from "../models/account/account-entity-model.js"



@Injectable()
export class PrismaIdentityRepository extends AccountRepository {
	private logger: Logger = new Logger("account:repository:prisma")


	constructor(private prismaService: PrismaService) {
		super()
	}


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
		}
		catch (e) {
			this.logger.error(e)
		}

		this.logger.verbose(`findByUsername(${username}) => ${JSON.stringify(maybeAccount)}`)

		if (!maybeAccount) {
			return undefined
		}

		const account = maybeAccount

		return new AccountEntityModel(account).toDomainModel()
	}


	public async findByUsernameFields(username: string): Promise<Account | undefined> {
		// Find account by provided username, try to fit it into the username and email fields
		let maybeAccount: DbContextModel.Account.Entity | null = null

		try {
			maybeAccount = await this.prismaService.account.findFirst({
				where: {OR: [{username: username}, {email: username}]},
			}) as DbContextModel.Account.Entity | null
		}
		catch (e) {
			this.logger.error(e)
		}

		this.logger.verbose(`findByUsernameFields(${username}) => ${JSON.stringify(maybeAccount)}`)

		if (!maybeAccount) {
			return undefined
		}

		const account = maybeAccount

		return new AccountEntityModel(account).toDomainModel()
	}


	public async create(identity: Account): Promise<Account> {
		let entity: DbContextModel.Account.Entity

		try {
			entity = await this.prismaService.account.create({
				data: AccountCreateModel.fromDomainModel(identity),
			}) as DbContextModel.Account.Entity
		}
		catch (e) {
			this.logger.error(e)
			throw e
		}

		return new AccountEntityModel(entity).toDomainModel()
	}


	public delete(entity: Account): Promise<void> {
		return Promise.resolve(undefined)
	}


	async exists(entity: Account): Promise<boolean> {
		const count = await this.prismaService.account.count({
			where: {
				OR: [
					{email: entity.email.address},
					{username: entity.username},
					{id: entity.id},
				],
			},
		})

		return count > 0
	}


	public findById(id: string): Promise<Account | null> {
		return Promise.resolve(undefined)
	}


	public getById(id: string): Promise<Account> {
		throw new NotImplementedException(id)
	}


	public update(entity: Account): Promise<Account> {
		return Promise.resolve(undefined)
	}
}