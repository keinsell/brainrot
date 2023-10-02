import {Controller, Get}                                                               from "@nestjs/common";
import {HealthCheck, HealthCheckService, MemoryHealthIndicator, PrismaHealthIndicator} from "@nestjs/terminus";
import {
  PrismaService,
}                                                                                      from "../database/prisma/prisma-service.ts"

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
		return this.health.check([
			() => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024),
			() => this.prisma.pingCheck("prisma", this.prismaService),
		]);
	}
}
