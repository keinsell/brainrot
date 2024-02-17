import {PhcString}         from '../../../../common/libraries/unihash/types/phc-string.js'
import type {EmailAddress} from '../../../../common/mailer/value-object/email-address.js'
import {DbContextModel}    from '../../../../common/modules/database/db-context-model.js'
import {Account}           from '../../entities/account.js'
import {AccountEmail}      from '../../value-objects/account-email.js'
import {AccountStatus}     from '../../value-objects/account-status.js'
import {Password}          from '../../value-objects/password.js'
import {type Username}     from '../../value-objects/username.js'



export class AccountEntityModel
	implements DbContextModel.Account.Entity
	{
		public createdAt: Date
		public email: string
		public emailVerificationStatus: DbContextModel.Enums.EmailVerificationStatus
		public id: string
		public password: string
		public updatedAt: Date
		public username: string
		public version: number
		public family_name: string | null
		public given_name: string | null
		public last_ip: string | null
		public last_login: Date | null
		public locale: string | null
		public name: string | null
		public nickname: string | null
		public phone_number: string | null
		public phone_verified: boolean
		public picture: string | null

		constructor(properties: DbContextModel.Account.Entity)
			{
				this.createdAt               = properties.createdAt
				this.email                   = properties.email
				this.emailVerificationStatus
				                             = properties.emailVerificationStatus
				this.id                      = properties.id
				this.password                = properties.password
				this.updatedAt               = properties.updatedAt
				this.username                = properties.username
				this.version                 = properties.version
			}

		toDomainModel(): Account
			{
				return Account.build({
					                     id       : this.id,
					                     username : this.username as Username,
					                     email    : AccountEmail.create({
						                                                    isVerified: this.emailVerificationStatus
						                                                                === 'VERIFIED',
						                                                    address   : this.email as EmailAddress,
					                                                    }),
					                     password : Password.fromHash(PhcString.deserialize(this.password as any)),
					                     status   : AccountStatus.ACTIVE,
					                     updatedAt: this.updatedAt,
					                     createdAt: this.createdAt,
					                     groups   : [],
				                     })
			}
	}