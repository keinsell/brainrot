import {Account}        from "@boundary/identity-and-access/modules/account/30-domain/aggregates/account.js"
import {AccountStatus}  from "@boundary/identity-and-access/modules/account/30-domain/value-objects/account-status.js"
import {Password}       from "@boundary/identity-and-access/modules/account/30-domain/value-objects/password.js"
import {DbContextModel} from "../../../../../../../../common/infrastructure/storage/database/db-context-model.js"
import {PhcString}      from "../../../../../../../../common/libraries/security/hashing/types/phc-string.js"



export class AccountEntityModel implements DbContextModel.Account.Entity {
	public createdAt: Date
	public email: string
	public emailVerificationStatus: DbContextModel.Enums.EmailVerificationStatus
	public id: string
	public password: string
	public updatedAt: Date
	public username: string


	constructor(properties: DbContextModel.Account.Entity) {
		this.createdAt               = properties.createdAt
		this.email                   = properties.email
		this.emailVerificationStatus = properties.emailVerificationStatus
		this.id                      = properties.id
		this.password                = properties.password
		this.updatedAt               = properties.updatedAt
		this.username                = properties.username
	}


	toDomainModel(): Account {
		return Account.CreateAccount({
			id:        this.id,
			username:  this.username,
			email:     {
				address:    this.email,
				isVerified: this.emailVerificationStatus === "VERIFIED",
			},
			password:  Password.fromHash(PhcString.deserialize(this.password as any)),
			status:    AccountStatus.ACTIVE,
			updatedAt: this.updatedAt,
			createdAt: this.createdAt,
		})
	}
}