import {Account}                                     from "@boundary/identity-and-access/modules/account/30-domain/aggregates/account.js"
import {IdentityRepository}                          from "@boundary/identity-and-access/modules/account/30-domain/repositories/identity-repository.js"
import {Email}                                       from "@boundary/identity-and-access/modules/account/30-domain/value-objects/email.js"
import {Username}                                    from "@boundary/identity-and-access/modules/account/30-domain/value-objects/username.js"
import {AccountCreateModel}                          from "@boundary/identity-and-access/modules/account/40-infrastructure/persistence/models/account/account-create-model.js"
import {AccountEntityModel}                          from "@boundary/identity-and-access/modules/account/40-infrastructure/persistence/models/account/account-entity-model.js"
import {Injectable, Logger, NotImplementedException} from "@nestjs/common"
import {PrismaService}                               from "../../../../../../../infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {DbContextModel}                              from "../../../../../../../infrastructure/storage/database/db-context-model.js"



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


	public getById(id: string): Promise<Account> {
		throw new NotImplementedException(id)
	}


	public async save(identity: Account): Promise<Account> {
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


	public update(entity: Account): Promise<Account> {
		return Promise.resolve(undefined)
	}
}