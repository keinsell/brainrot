import detectPort from 'detect-port';
import getPort    from 'get-port';

export async function portFinder(target?: number): Promise<{ port: number, isPortChanged: boolean }> {
	let isPortChanged = false;

	if (!target) {
		target = await getPort()
		isPortChanged = true;
	}

	let isPortAvailable = await detectPort(target);

	while (!isPortAvailable) {
		target = await getPort()
		isPortAvailable = await detectPort(target);
		isPortChanged = true;
	}

	return {
		port         : target!,
		isPortChanged: isPortChanged,
	}
}
