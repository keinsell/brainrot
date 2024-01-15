import { faker }                  from '@faker-js/faker'
import {
  Injectable,
  Logger,
}                                 from '@nestjs/common'
import { SeederBase }             from '../../../common/libraries/seeder/seeder-base.js'
import { PrismaService }          from '../../../common/modules/resources/prisma/services/prisma-service.js'
import { AccountFixture }         from '../../../utilities/fixtures/account-fixture.js'
import { $Enums }                 from '../../../vendor/prisma/index.js'
import { RegisterAccountCommand } from '../commands/register-account-command.js'
import { AccountService }         from '../services/account-service.js'
import EmailVerificationStatus = $Enums.EmailVerificationStatus



@Injectable()
export class AccountSeeder
  extends SeederBase<RegisterAccountCommand>
  {

	 constructor(
		private prismaService : PrismaService,
		private accountService : AccountService,
	 )
		{
		  super( new Logger( 'seeder:domain' ) )
		}


	 public async count() : Promise<number>
		{
		  return this.prismaService.account.count()
		}


	 public async exists(input : RegisterAccountCommand) : Promise<boolean>
		{
		  const exists = await this.prismaService.account.findUnique( {
																							 where : {
																								email : input.email,
																							 },
																						  } )

		  return exists !== null
		}


	 public async fabricate() : Promise<RegisterAccountCommand>
		{
		  return {
			 email    : faker.internet.email(),
			 password : AccountFixture.password,
			 username : faker.internet.userName(),
		  }
		}


	 public async save(input : RegisterAccountCommand) : Promise<unknown>
		{
		  const account = await this.accountService.register( input )

		  await this.prismaService.account.update( {
																	where : {
																	  id : account.id,
																	},
																	data  : {
																	  emailVerificationStatus : EmailVerificationStatus.VERIFIED,
																	},
																 } )

		  return account
		}
  }