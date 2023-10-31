import {Account}        from "@boundary/identity-and-access/account/domain/entities/account.js"
import {DbContextModel} from "../../../../../infrastructure/storage/database/db-context-model.js"



export class AccountEntityModel implements DbContextModel.Account.Entity {
	public createdAt: Date
	public email: string
	public emailVerificationStatus: DbContextModel.Enums.EmailVerificationStatus
	public id: string
	public password: string
	public salt: string
	public updatedAt: Date
	public username: string


	constructor(properties: DbContextModel.Account.Entity) {
		this.createdAt               = properties.createdAt
		this.email                   = properties.email
		this.emailVerificationStatus = properties.emailVerificationStatus
		this.id                      = properties.id
		this.password                = properties.password
		this.salt                    = properties.salt
		this.updatedAt               = properties.updatedAt
		this.username                = properties.username
	}


	toDomainModel(): Account {
		return Account.CreateAccount({
			id:       this.id,
			username: this.username,
			email:    {
				address:    this.email,
				isVerified: this.emailVerificationStatus === "VERIFIED",
			},
			password: {
				hash: this.password,
			},
		})
	}
}