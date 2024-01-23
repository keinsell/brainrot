import { faker }                      from '@faker-js/faker'
import { ApiProperty }                from '@nestjs/swagger'
import { ApiModel }                   from '../../../utilities/docs-utils/swagger-api-model.js'
import { AccountFixture }             from '../../../utilities/fixtures/account-fixture.js'
import { ApiPropertyAccountUsername } from '../../account/value-objects/username.js'



@ApiModel( {
				 name        : 'Auhenticate',
				 description : 'asdasd',
			  } )
export class Authenticate
  {
	 /**
	  * Represents a username.
	  * @typedef {string} username
	  */
	 @ApiPropertyAccountUsername username : string

	 /**
	  * The password variable is a string that represents a user's password.
	  *
	  * @type {string}
	  */
	 @ApiProperty( {
						  name        : 'password',
						  description : 'The account\'s password',
						  example     : AccountFixture.password,
						  examples    : [
							 faker.internet.password(), faker.internet.password(), faker.internet.password(),

						  ],
						} ) password : string
  }