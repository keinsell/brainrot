import {Injectable, Logger, OnModuleDestroy, OnModuleInit} from "@nestjs/common"
import delay                                               from "delay"
import ms                                                  from "ms"
import {Prisma, PrismaClient}                              from './prisma-client/index.js';
import {PrismaClientInitializationError}                   from "./prisma-client/runtime/library.js"

@Injectable()
export class PrismaService
	extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
	implements OnModuleInit, OnModuleDestroy {
	private logger: Logger = new Logger(this.constructor.name)

	constructor() {
		super({
			errorFormat: "pretty",
			log        : [
				{
					emit : 'event',
					level: 'query',
				},
				{
					emit : 'event',
					level: 'error',
				},
				{
					emit : 'event',
					level: 'info',
				},
				{
					emit : 'event',
					level: 'warn',
				},
			],
		});
	}

	async onModuleInit() {
		this.$on('error', (event) => {
			this.logger.error(event.message);
		});
		this.$on('warn', (event) => {
			this.logger.warn(event.message);
		});
		this.$on('info', (event) => {
			this.logger.verbose(event.message);
		});
		this.$on('query', (event) => {
			this.logger.verbose(event.query);
		});

		let connectionState = false;
		let connectionRetryDelay = ms('2s');

		// Handle retries to database and do not crash server

		new Promise(async () => {
			while (!connectionState) {
				try {
					await this.$connect();
					this.logger.log("Connection with database was established.")

					connectionState = true
				}
				catch (
					error
					) {
					if (error instanceof PrismaClientInitializationError) {
						this.logger.error(`Encountered error while establishing connection with database: ${error.message.split('\n')[2]}`)
					}
					else {
						this.logger.error(`Error while connecting to database: ${JSON.stringify(error)}`)
					}

					await delay(connectionRetryDelay)
					connectionRetryDelay = connectionRetryDelay * 2
				}
			}
		})
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}