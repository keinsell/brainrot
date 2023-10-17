import bytes from 'bytes';
import os    from 'os';



export class SystemInformation {
	constructor() {}

	public printSystemInfo(): void {
		console.log(`Node.js Version: ${process.version}`);
		console.log(`Node.js Platform: ${process.platform}`);
		console.log(`Node.js Architecture: ${process.arch}`);
		console.log(`Node.js Heap: ${this.formatMemoryInfo()}\n`);

		console.log(`Environment: ${process.env.NODE_ENV ?? 'development'}`);
		console.log(`Host: ${process.env.HOST ?? 'localhost'}`);
		console.log(`Port: ${process.env.PORT ?? 3000}`);
		console.log(`Protocol: ${process.env.PROTOCOL ?? 'http'}\n`);

		console.log(`OS: ${os.userInfo().username} ${process.platform} ${process.arch}`);
		console.log(`CPU: ${this.formatCpuInfo()}`);
		console.log(`RAM: ${this.formatRamInfo()}`);

		console.log(`\n\n`);
	}

	private formatMemoryInfo(): string {
		const memoryUsage = process.memoryUsage();
		return `${bytes(memoryUsage.heapUsed)} / ${bytes(memoryUsage.heapTotal)}`;
	}

	private formatCpuInfo(): string {
		const avgCpuSpeedInGhz = (
			os.cpus().reduce((acc, cpu) => acc + cpu.speed, 0) / os.cpus().length / 1000
		).toFixed(2);
		return `${os.cpus()[0].model} @ ${avgCpuSpeedInGhz} GHz`;
	}

	private formatRamInfo(): string {
		const totalMemory = bytes(os.totalmem());
		const freeMemory = bytes(os.freemem());
		return `${totalMemory} (${freeMemory} free)`;
	}
}