import type {Account as PrismaAccount} from '@prisma/client'



/** DbContextModel is a namespace that contains all the models from database that can be used in the
 *  application, to not be confused with domain models - these models are only responsible for providing
 *  type-safe interaction with database inputs and reads. */
export namespace DbContextModel {
	export namespace Account {
		export type Entity = PrismaAccount;
		//export type Create = Prisma.CreateAccountInput;
	}
}