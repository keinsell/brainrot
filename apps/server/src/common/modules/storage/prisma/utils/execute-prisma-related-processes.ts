import {Logger} from "@nestjs/common"
import {exec}   from "node:child_process"
import {ApplicationConfiguration} from "../../../../../configs/application-configuration.js"
import {env} from "../../../../../configs/env.js"
import {StaticFeatureFlags} from "../../../../../configs/static-feature-flags.js"
import {portAllocator} from "../../../../../utilities/network-utils/port-allocator.js"


// TODO: This may spamming a lot in process, needs to be fixed.
export async function executePrismaRelatedProcesses() {
	if (!env.isDev) {
		return
	}

	const logger = new Logger("prisma:cli")

	if (StaticFeatureFlags.shouldRunPrismaMigrate) {
		exec(`npx prisma migrate dev --skip-generate`, (error, stdout, stderr) => {
			logger.verbose('-'.repeat(54))
			logger.verbose(`Running "npx prisma migrate dev --skip-generate"`)
			stdout.split("\n").forEach((line) => {
				if (line === "") {
					return;
				}
				logger.verbose(line);
			})

			logger.verbose('-'.repeat(54))
		});

	}

	if (StaticFeatureFlags.shouldRunPrismaStudio) {
		const freePort = await portAllocator(ApplicationConfiguration.prismaAdminPort)

		if (freePort.wasReplaced) {
			logger.warn(`Prisma Admin port availability check failed and ::${ApplicationConfiguration.prismaAdminPort} is not available, found a new shiny ::${freePort.port} instead. If you believe this is a mistake, please check your environment variables and processes that are running on your machine.`);
		} else {
			logger.log(`Prisma Admin port availability check succeeded and requested ::${ApplicationConfiguration.prismaAdminPort} is available`);
		}

		ApplicationConfiguration.prismaAdminPort = freePort.port

		exec(`npx prisma studio -p ${ApplicationConfiguration.prismaAdminPort} --browser none`, (error, stdout, stderr) => {
			logger.verbose('-'.repeat(54))
			logger.verbose(`Running "npx prisma studio -p ${ApplicationConfiguration.prismaAdminPort} --browser none"`)
			stdout.split("\n").forEach((line) => {
				if (line === "") {
					return;
				}
				logger.verbose(line);
			})

			logger.verbose('-'.repeat(54))
		});
	}
}