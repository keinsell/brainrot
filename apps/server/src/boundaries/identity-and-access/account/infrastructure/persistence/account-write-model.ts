import { Account } from '@boundary/identity-and-access/account/domain/aggregates/account.js';
import { DbContextModel } from '../../../../../infrastructure/storage/database/db-context-model.js';

export class AccountWriteModel implements DbContextModel.Account.CreatePayload {
	public createdAt?: Date | string;
	public email: string;
	public emailVerificationStatus: DbContextModel.Enums.EmailVerificationStatus;
	public id?: string;
	public password: string;
	public salt: string;
	public updatedAt?: Date | string;
	public username: string;

	constructor(properties: DbContextModel.Account.CreatePayload) {
		this.createdAt = properties.createdAt;
		this.email = properties.email;
		this.emailVerificationStatus = properties.emailVerificationStatus;
		this.id = properties.id;
		this.password = properties.password;
		this.salt = properties.salt;
		this.updatedAt = properties.updatedAt;
		this.username = properties.username;
	}

	static fromDomainModel(account: Account): AccountWriteModel {
		return new AccountWriteModel({
			email: account.email.address,
			emailVerificationStatus: account.email.isVerified ? 'VERIFIED' : 'UNVERIFIED',
			password: account.password.hash,
			salt: account.password.salt ?? '',
			username: account.username,
		});
	}
}
