import {DbContextModel} from "../../../../../common/infrastructure/storage/database/db-context-model.js"
import {Account}        from '../../../domain/account.js';



export class AccountCreateModel
	implements DbContextModel.Account.CreatePayload {
	public createdAt?: Date | string;
	public email: string;
	public emailVerificationStatus: DbContextModel.Enums.EmailVerificationStatus;
	public id?: string;
	public password: string;
	public updatedAt?: Date | string;
	public username: string;


	constructor(properties: DbContextModel.Account.CreatePayload) {
		this.createdAt               = properties.createdAt;
		this.email                   = properties.email;
		this.emailVerificationStatus = properties.emailVerificationStatus;
		this.id                      = properties.id;
		this.password                = properties.password;
		this.updatedAt               = properties.updatedAt;
		this.username                = properties.username;
	}


	static fromDomainModel(account: Account): AccountCreateModel {
		return new AccountCreateModel({
			email:                   account.email.address,
			emailVerificationStatus: account.email.isVerified ? 'VERIFIED' : 'UNVERIFIED',
			password:                account.password.hash.serialize(),
			username:                account.username,
		});
	}
}