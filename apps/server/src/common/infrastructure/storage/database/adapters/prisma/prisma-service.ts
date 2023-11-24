import {Injectable, Logger, OnModuleDestroy, OnModuleInit} from "@nestjs/common"
import delay                                               from 'delay'
import ms                                                  from 'ms'
import {Prisma, PrismaClient}                              from "../../../../../../vendor/prisma/index.js"



@Injectable()
export class PrismaService
	extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
	implements OnModuleInit, OnModuleDestroy {
	private logger: Logger = new Logger("database:prisma")


	constructor() {
		super({
			errorFormat: "pretty",
			log:         [
				{
					emit:  'event',
					level: 'query',
				}, {
					emit:  'event',
					level: 'error',
				}, {
					emit:  'event',
					level: 'info',
				}, {
					emit:  'event',
					level: 'warn',
				},
			],
		});
	}


	async onModuleInit() {
		this.$on('error', (event) => {
			//			this.logger.error(event.message);
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

		// Use an immediately invoked asynchronous function to handle the connection in the background.
		//noinspection ES6MissingAwait
		this.startConnection()
	}


	async onModuleDestroy() {
		await this.$disconnect();
	}


	private async startConnection() {
		let connectionState      = false;
		let connectionRetryDelay = ms('5s');

		// Handle retries to the database without blocking
		while (!connectionState) {
			try {
				await this.$connect();
				this.logger.log("Connection with a database established.");
				connectionState = true;
			}
			catch (error) {
				this.logger.error(`Error while connecting to a database: ${JSON.stringify(error)}`);
				await delay(connectionRetryDelay);
				connectionRetryDelay = connectionRetryDelay * 2;
			}
		}
	}
}