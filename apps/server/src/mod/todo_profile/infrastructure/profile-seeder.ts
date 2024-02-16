import { faker }           from '@faker-js/faker'
import {
  Injectable,
  Logger,
}                          from '@nestjs/common'
import { Address }         from '../../../kernel/libraries/address/address.js'
import { CountryCode }     from '../../../kernel/libraries/address/country-code.js'
import type { PostalCode } from '../../../kernel/libraries/address/postal-code.js'
import { SeederBase }      from '../../../kernel/libraries/seeder/seeder-base.js'
import { PrismaService }   from '../../../kernel/modules/resources/prisma/services/prisma-service.js'
import { Prisma }          from '../../../vendor/prisma/index.js'
import UserCreateInput = Prisma.UserCreateInput



@Injectable()
export class ProfileSeeder
  extends SeederBase<UserCreateInput>
  {
	 private excludedAccountIds = new Array<string>()


	 constructor(private prismaService : PrismaService)
		{
		  super( new Logger( 'seeder:profile' ) )
		}


	 public async count() : Promise<number>
		{
		  return this.prismaService.user.count()
		}


	 public async exists(input : Prisma.UserCreateInput) : Promise<boolean>
		{
		  const exists = await this.prismaService.user.findUnique( {
																						 where : {
																							accountId : input.Account.connect!.id,
																						 },
																					  } )

		  return exists !== null
		}


	 public async fabricate() : Promise<Prisma.UserCreateInput>
		{
		  // Find domain entity without a profile entity to gain domain ID
		  const account = await this.prismaService.account.findFirst( {
																							 where : {
																								id : {notIn : this.excludedAccountIds},
																							 },
																						  } )

		  if ( !account ) throw new Error( 'No domain found without a profile entity' )

		  if ( this.excludedAccountIds.includes( account.id ) )
			 {
				return this.fabricate()
			 }

		  this.excludedAccountIds.push( account.id )

		  const address : Omit<Address, 'stringify' | 'coordinates'> = {
			 street1    : faker.location.streetAddress(),
			 street2    : undefined,
			 city       : faker.location.city(),
			 postalCode : faker.location.zipCode() as PostalCode,
			 state      : faker.location.state(),
			 country    : faker.location.countryCode() as CountryCode,
		  }

		  return {
			 Account           : {
				connect : {
				  id : account.id,
				},
			 },
			 firstName         : faker.person.firstName(),
			 lastName          : faker.person.lastName(),
			 about             : faker.person.bio(),
			 ShippingAddresses : {
				create : {
				  fullName    : faker.name.fullName(),
				  streetLine1 : faker.location.streetAddress(),
				  streetLine2 : undefined,
				  city        : faker.location.city(),
				  zipCode     : faker.location.zipCode(),
				  state       : faker.location.state(),
				  country     : faker.location.countryCode(),
				},
			 },
			 billingAddress    : {
				connectOrCreate : {
				  create : {
					 taxIdentifier : faker.finance.iban(),
					 streetLine1   : faker.location.streetAddress(),
					 streetLine2   : undefined,
					 city          : faker.location.city(),
					 zipCode       : faker.location.zipCode(),
					 state         : faker.location.state(),
					 country       : faker.location.countryCode(),
					 legalName     : faker.company.name(),
				  },
				  where  : {
					 id : account.id,
				  },
				},
			 },
			 avatar            : faker.image.avatar(),
			 email             : faker.internet.email(),
			 createdAt         : faker.date.past(),
		  }
		}


	 public async save(input : Prisma.UserCreateInput) : Promise<unknown>
		{
		  return this.prismaService.user.create( {
																 data : input,
															  } )
		}
  }