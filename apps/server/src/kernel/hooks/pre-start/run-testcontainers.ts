import {$}                                           from 'execa'
import {Readable}                                    from 'stream'
import {GenericContainer, type StartedTestContainer} from 'testcontainers'
import {LogWaitStrategy}                             from 'testcontainers/build/wait-strategies/log-wait-strategy.js'
import {__appConfig}                                 from '../../../conf/global/__config.js'
import {CombinedLogger}                              from "../../logger/logger.js"



export var TEST_CONATINERS: StartedTestContainer[] = []


export class ContainerEnvironment {
	private containers: { name: string, container: GenericContainer }[] = []


	constructor() {
		const postgres = new GenericContainer('postgres:latest')
		.withEnvironment({
			POSTGRES_USER:     'test_user',
			POSTGRES_PASSWORD: 'test_password',
			POSTGRES_DB:       'test_db',
		})
		.withExposedPorts(5432)
		.withLogConsumer((stream: Readable) => {
			const logger = new CombinedLogger('container::postgresql')
			stream.on('data', (data) => {
				const logLine = data.toString().trim()
				if (logLine) {
					logger.debug(logLine)
				}
			})
		})
		.withWaitStrategy(new LogWaitStrategy('database system is ready to accept connections', 2))

		this.containers.push({
			name:      'postgres',
			container: postgres,
		})
	}


	static async run() {
		if (__appConfig.FEATURE_USE_DOCKER_TESTCONTAINERS) {
			new CombinedLogger("environment").debug("Application is running in" + " 'testing' environment" + " which means there will" + " be mocked up" + " dependencies such as" + " databases. Please a" + " wait a longer while to" + " let application setup" + " everything.")

			await new ContainerEnvironment().startContainers()
		}
	}


	private async startContainers() {
		for await (const container of this.containers) {
			const runningContainer = await container.container.start()
			const logger           = new CombinedLogger('testcontainer')
			logger.info(`Started ${container.name}`)

			if (container.name === 'postgres') {
				// Get container information
				const host = runningContainer.getHost()
				const port = runningContainer.getMappedPort(5432)

				// Set the database URI in the environment variable
				const dbUri = `postgresql://test_user:test_password@${host}:${port}/test_db`
				logger.info(`Postgres container is available at: ${dbUri}`)
				process.env.DATABASE_URI = dbUri

				new CombinedLogger('prisma::cli').debug('Pushing database schema with prisma')
				await $`prisma db push --skip-generate`
				new CombinedLogger('prisma::cli').info('Completed database migration')
			}

			TEST_CONATINERS.push(runningContainer)
		}
	}
}