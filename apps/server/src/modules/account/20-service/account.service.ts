import {Injectable}                                     from "@nestjs/common"
import {Client, ClientProxy, MessagePattern, Transport} from "@nestjs/microservices"
import {EventBus}                                       from "../../../common/infrastructure/messaging/event-bus.js"
import {Unihash}                                        from "../../../common/libraries/unihash/index.js"
import {KdfAlgorithm}                                   from "../../../common/libraries/unihash/key-derivation-functions/key-derivation-function.js"
import {Account}                                        from "../../../domain/account/account.js"
import {AccountPolicy}                                  from "../../../domain/account/policies/account-policy.js"
import {AccountRepository}                              from "../../../domain/account/repositories/account-repository.js"
import {Email}                                          from "../../../domain/account/value-objects/email.js"
import {Password}                                       from "../../../domain/account/value-objects/password.js"
import {Username}                                       from "../../../domain/account/value-objects/username.js"



@Injectable()
export class AccountService {
	@Client({
		transport: Transport.NATS,
		options:   {
			url: 'nats://localhost:4222',
			// Other options
		},
	})
	client: ClientProxy;


	constructor(private policy: AccountPolicy, private repository: AccountRepository, private hashing: Unihash) {}


	public async register(accountPayload: {
		username: string; email: string; password: string;
	}): Promise<{ id: any; email: string; username: string }> {
		const username = accountPayload.username as Username;

		const email = {
			isVerified: false,
			address:    accountPayload.email.toLowerCase(),
		} as Email;

		const password = await Password.fromPlain(accountPayload.password, this.hashing.use(KdfAlgorithm.Argon2id));

		let identity = Account.RegisterAccount({
			username: username.toLowerCase(),
			email:    email,
			password: password,
		});

		const maybePolicy = this.policy.merge(await this.policy.isUniqueEmail(identity.email), await this.policy.isUniqueUsername(identity.username), await this.policy.shouldHaveSecurePassword(identity.password))

		if (maybePolicy.isErr()) {
			throw maybePolicy._unsafeUnwrapErr()
		}

		await new EventBus().publish(identity.getUncommittedEvents())

		this.client.send('account.registered', {
			test: 'test',
		})

		identity = await this.repository.save(identity)

		return {
			id:       identity.id,
			username: identity.username,
			email:    identity.email.address,
		}
	}


	@MessagePattern('account.registered')
	async handleAccountRegistered(data: Record<string, unknown>) {
	}
}