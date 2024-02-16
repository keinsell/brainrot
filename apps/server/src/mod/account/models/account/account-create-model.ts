import {DbContextModel} from "../../../../kernel/modules/database/db-context-model.js"
import {Account}        from '../../entities/account.js';



export class AccountCreateModel
	implements DbContextModel.Account.CreatePayload {
	public createdAt? : Date | string;
	public email : string;
	public emailVerificationStatus : DbContextModel.Enums.EmailVerificationStatus;
	public id? : string;
	public password : string;
	public updatedAt? : Date | string;
	public username : string;


	constructor(properties : DbContextModel.Account.CreatePayload) {
		Object.assign(this, properties)
	}


	static fromDomainModel(account : Account) : AccountCreateModel {
		return new AccountCreateModel({
			id                     : account.id,
			email                  : account.email.address,
			emailVerificationStatus: account.email.isVerified ? 'VERIFIED' : 'UNVERIFIED',
			password               : account.password.hash.serialize(),
			username               : account.username,
		});
	}
}