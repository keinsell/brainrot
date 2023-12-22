export function LogActivity() {
	return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;
		const className      = target.constructor.name;

		descriptor.value = async function (...args: any[]) {
			console.log(`[${className}] Call - ${propertyName}:`, args);

			try {
				const result = await originalMethod.apply(this, args);
				console.log(`[${className}] Success - ${propertyName}:`, result);
				return result;
			} catch (error) {
				console.error(`[${className}] Error - ${propertyName}:`, error);
				throw error;
			}
		}
	}
}
