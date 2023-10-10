import {Controller, Get} from "@nestjs/common";
import {
	HealthCheck,
	HealthCheckService,
	HealthIndicatorFunction,
	MemoryHealthIndicator,
	PrismaHealthIndicator,
}                        from "@nestjs/terminus";
import {
	PrismaService,
}                        from "../database/prisma/prisma-service.ts"

@Controller("health")
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private memory: MemoryHealthIndicator,
		private prisma: PrismaHealthIndicator,
		private prismaService: PrismaService,
	) {}

	@Get()
	@HealthCheck()
	check() {
		const healthIndicators: HealthIndicatorFunction[] = []

		healthIndicators.push(this.checkMemory.bind(this))
		healthIndicators.push(this.checkPrisma.bind(this))

		return this.health.check([
			...healthIndicators,
		]);
	}

	private checkMemory() {
		// Service should not use more than 150MB memory
		return this.memory.checkHeap("memory_heap", 150 * 1024 * 1024)
	}

	private checkPrisma() {
		// Prisma should be able to ping database
		return this.prisma.pingCheck("prisma", this.prismaService)
	}

	private checkRedis() {
		// Service should be able to ping redis
	}
}
