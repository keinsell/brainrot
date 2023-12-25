import {PhcString}      from "../../../../common/libraries/unihash/types/phc-string.js"
import {DbContextModel} from "../../../../common/modules/storage/database/db-context-model.js"
import {Account}        from "../../entities/account.js"
import {AccountStatus}  from "../../value-objects/account-status.js"
import {Email}          from "../../value-objects/email.js"
import {Password}       from "../../value-objects/password.js"



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
		return Account.build({
			id:        this.id,
			username:  this.username,
			email:     Email.create({
				isVerified: this.emailVerificationStatus === "VERIFIED",
				address:    this.email,
			}),
			password:  Password.fromHash(PhcString.deserialize(this.password as any)),
			status:    AccountStatus.ACTIVE,
			updatedAt: this.updatedAt,
			createdAt: this.createdAt,
		})
	}
}