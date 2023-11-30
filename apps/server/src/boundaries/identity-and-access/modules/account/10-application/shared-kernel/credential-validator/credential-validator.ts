import {Account}                                              from "@boundary/identity-and-access/modules/account/30-domain/aggregates/account.js"
import {AccountRepository}                                    from "@boundary/identity-and-access/modules/account/30-domain/repositories/account-repository.js"
import {Unihash}                                              from "../../../../../../../common/libraries/unihash/unihash.js"
import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common"
import {err, ok, Result}                                      from "neverthrow"
import {EventBus}                                             from "../../../../../../../common/infrastructure/messaging/event-bus.js"



/**
 * This class is responsible for validating credentials. This is exposed by shared-kernel and further used by
 * authentication to encapsulate the logic of validating credentials as authentication do not have access to account itself.
 */
@Injectable()
export class CredentialValidator {
	constructor(
		private repository: AccountRepository,
		private hashingService: Unihash,
	) {}


	/**
	 * Validates the credentials of a user.
	 *
	 * @param {string} username - The username of the user.
	 * @param {string} password - The password of the user.
	 * @returns {Promise<any>} - A promise that resolves with the validation result.
	 */
	public async validateCredentials(username: string, password: string): Promise<Result<Account, NotFoundException | UnauthorizedException>> {
		// Find the account by any username field (email, username)
		const user = await this.repository.findByUsernameFields(username)

		if (!user) {
			return err(new NotFoundException("User not found"))
		}

		// Verify the password

		const passwordVerified = await user.password.compare(password, this.hashingService.which(user.password.hash.serialize()))

		if (!passwordVerified) {
			return err(new UnauthorizedException("Invalid credentials"))
		}

		user.authenticate()

		new EventBus().publish(user.getUncommittedEvents())

		return ok(user)
	}
}