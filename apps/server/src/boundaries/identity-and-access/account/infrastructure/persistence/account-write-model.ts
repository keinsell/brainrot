import {$Enums}         from "../../../../../externals/generated/prisma/index.js"
import {DbContextModel} from "../../../../../infrastructure/storage/database/db-context-model.js"



export class AccountWriteModel implements DbContextModel.Account.CreatePayload {
	public createdAt: Date | string
	public email: string
	public emailVerificationStatus: $Enums.EmailVerificationStatus
	public id: string
	public password: string
	public salt: string
	public updatedAt: Date | string
	public username: string
}