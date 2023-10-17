import detectPort from "detect-port";
import getPort    from "get-port";



export async function portFinder(
	target?: number,
): Promise<{ port: number; isPortChanged: boolean }> {
	let isPortChanged = false;
	let availablePort = target;

	availablePort = await getPort({port: availablePort});

	let isPortAvailable = await detectPort(availablePort);

	while (!isPortAvailable) {
		availablePort = await getPort();
		isPortAvailable = await detectPort(availablePort);
		isPortChanged = true;
	}

	isPortChanged = target !== availablePort;

	return {
		port         : availablePort!,
		isPortChanged: isPortChanged,
	};
}
