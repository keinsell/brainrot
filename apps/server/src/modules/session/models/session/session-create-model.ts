import { DbContextModel } from '../../../../common/modules/database/db-context-model.js'
import { Prisma }         from '../../../../vendor/prisma/index.js'
import { UserSession }    from '../../entities/user-session.js'



export class SessionCreateModel
  implements DbContextModel.Session.CreatePayload
  {
	 public Account : Prisma.AccountCreateNestedOneWithoutSessionsInput
	 public createdAt? : Date | string
	 public id : string

	 constructor(payload : DbContextModel.Session.CreatePayload)
		{
		  Object.assign( this, payload )
		}

	 static fromDomainModel(session : UserSession) : SessionCreateModel
		{
		  return new SessionCreateModel( {
													  id      : session.id,
													  Account : {
														 connect : {
															id : session.subject,
														 },
													  },
													} )
		}
  }