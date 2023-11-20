import {$Enums, Account as PrismaAccount, Prisma} from '../../../vendor/prisma/index.js'



/** DbContextModel is a namespace that contains all the models from database that can be used in the
 *  application, to not be confused with domain models - these models are only responsible for providing
 *  type-safe interaction with database inputs and reads. */
export namespace DbContextModel {
	export namespace Enums {
		export type EmailVerificationStatus = $Enums.EmailVerificationStatus
	}

	export namespace Account {
		export type Entity = PrismaAccount;
		export type CreatePayload = Prisma.AccountCreateInput;
		export type UpdatePayload = Prisma.AccountUpdateInput;
		export type WhereUnique = Prisma.AccountWhereUniqueInput;
		export type Where = Prisma.AccountWhereInput;
	}
}