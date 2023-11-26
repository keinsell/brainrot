// TODO: Drop Lodash

import {Logger, Module, OnModuleInit}                                                                    from '@nestjs/common';
import {PATH_METADATA}                                                                                   from "@nestjs/common/constants.js"
import {ExternalContextCreator}                                                                          from "@nestjs/core"
import {flatten, groupBy}                                                                                from 'lodash';
import Stripe                                                                                            from 'stripe';
import {DiscoveryModule}                                                                                 from "../discovery/discovery-module.js"
import {DiscoveryService}                                                                                from "../discovery/discovery-service.js"
import {createConfigurableDynamicRootModule}                                                             from "./dynamic-module.js"
import {STRIPE_CLIENT_TOKEN, STRIPE_MODULE_CONFIG_TOKEN, STRIPE_WEBHOOK_HANDLER, STRIPE_WEBHOOK_SERVICE} from "./stripe-constraints.js"
import {InjectStripeModuleConfig}                                                                        from "./stripe-decorator.js"
import {StripeModuleConfig}                                                                              from "./stripe-interface.js"
import {StripePayloadService}                                                                            from "./stripe-payload-service.js"
import {StripeWebhookController}                                                                         from "./stripe-webhook-controller.js"
import {StripeWebhookService}                                                                            from "./stripe-webhook-service.js"



@Module({
	controllers: [StripeWebhookController],
})
export class StripeModule
	extends createConfigurableDynamicRootModule<StripeModule, StripeModuleConfig>(
		STRIPE_MODULE_CONFIG_TOKEN,
		{
			imports:   [DiscoveryModule],
			providers: [
				{
					provide:    Symbol('CONTROLLER_HACK'),
					useFactory: (config: StripeModuleConfig) => {
						const controllerPrefix =
							      config.webhookConfig?.controllerPrefix || 'stripe';

						Reflect.defineMetadata(
							PATH_METADATA,
							controllerPrefix,
							StripeWebhookController,
						);
						config.webhookConfig?.decorators?.forEach((deco) => {
							deco(StripeWebhookController);
						});
					},
					inject:     [STRIPE_MODULE_CONFIG_TOKEN],
				},
				{
					provide:    STRIPE_CLIENT_TOKEN,
					useFactory: ({
						apiKey,
						typescript = true,
						apiVersion = '2023-10-16',
						webhookConfig,
						...options
					}: StripeModuleConfig): Stripe => {
						return new Stripe(apiKey, {
							typescript,
							apiVersion,
							...options,
						});
					},
					inject:     [STRIPE_MODULE_CONFIG_TOKEN],
				},
				StripeWebhookService,
				StripePayloadService,
			],
			exports:   [STRIPE_MODULE_CONFIG_TOKEN, STRIPE_CLIENT_TOKEN],
		},
	)
	implements OnModuleInit {
	private readonly logger = new Logger(StripeModule.name);


	constructor(
		private readonly discover: DiscoveryService,
		private readonly externalContextCreator: ExternalContextCreator,
		@InjectStripeModuleConfig()
		private readonly stripeModuleConfig: StripeModuleConfig,
	) {
		super();
	}


	public async onModuleInit() {
		// If they didn't provide a webhook config secret there's no reason
		// to even attempt discovery
		if (!this.stripeModuleConfig.webhookConfig) {
			return;
		}

		const noOneSecretProvided =
			      this.stripeModuleConfig.webhookConfig &&
			      !this.stripeModuleConfig.webhookConfig?.stripeSecrets.account &&
			      !this.stripeModuleConfig.webhookConfig?.stripeSecrets.connect;

		if (noOneSecretProvided) {
			const errorMessage =
				      'missing stripe webhook secret. module is improperly configured and will be unable to process incoming webhooks from Stripe';
			this.logger.error(errorMessage);
			throw new Error(errorMessage);
		}

		this.logger.log('Initializing Stripe Module for webhooks');

		const [stripeWebhookService] = (
			(
				// @ts-ignore
				await this.discover.providersWithMetaAtKey<boolean>(
					STRIPE_WEBHOOK_SERVICE as any,
				)
			) || []
		).map((x) => x.discoveredClass.instance);

		if (
			!stripeWebhookService ||
			!(
				stripeWebhookService instanceof StripeWebhookService
			)
		) {
			throw new Error('Could not find instance of Stripe Webhook Service');
		}

		// @ts-ignore
		const eventHandlerMeta =
			      // @ts-ignore
			      await this.discover.providerMethodsWithMetaAtKey<string>(
				      STRIPE_WEBHOOK_HANDLER,
			      )

		const grouped = groupBy(
			eventHandlerMeta,
			(x) => x.discoveredMethod.parentClass.name,
		);

		const webhookHandlers = flatten(
			Object.keys(grouped).map((x) => {
				this.logger.log(`Registering Stripe webhook handlers from ${x}`);

				return grouped[x].map(({
					discoveredMethod,
					meta: eventType,
				}) => (
					{
						key:     eventType,
						handler: this.externalContextCreator.create(
							discoveredMethod.parentClass.instance,
							discoveredMethod.handler,
							discoveredMethod.methodName,
							undefined, // metadataKey
							undefined, // paramsFactory
							undefined, // contextId
							undefined, // inquirerId
							undefined, // options
							'stripe_webhook', // contextType
						),
					}
				));
			}),
		);

		const handleWebhook = async (webhookEvent: { type: string }) => {
			const {type}   = webhookEvent;
			const handlers = webhookHandlers.filter((x) => x.key === type);

			if (handlers.length) {
				if (
					this.stripeModuleConfig?.webhookConfig?.loggingConfiguration
						?.logMatchingEventHandlers
				) {
					this.logger.log(
						`Received webhook event for ${type}. Forwarding to ${handlers.length} event handlers`,
					);
				}
				await Promise.all(handlers.map((x) => x.handler(webhookEvent)));
			}
		};

		stripeWebhookService.handleWebhook = handleWebhook;
	}
}