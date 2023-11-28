import {Module}                      from "@nestjs/common"
import {ConfigModule, ConfigService} from "@nestjs/config"
import {StripeModuleConfig}          from "../../../services/stripe/stripe-interface.js"
import {StripeModule}                from "../../../services/stripe/stripe-module.js"



@Module({
	imports:   [
		StripeModule.forRootAsync(
			StripeModule,
			{
				imports: [ConfigModule],
				exports: [],
				inject:  [ConfigService],
				useFactory(config: ConfigService) {
					return {
						apiKey:        config.get('STRIPE_API_KEY'),
						webhookConfig: {
							stripeSecrets: {
								account: 'abc',
								connect: 'cba',
							},
						},
					} as StripeModuleConfig;
				},
			},
		),
	],
	exports:   [StripeModule],
	providers: [],
})
export class StripeIntegrationModule {}