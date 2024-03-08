//
//One secure mechanism for handling secrets in Node.js is using a library or implementing a Secret Manager approach as previously discussed, along with some additional best practices.
//
//1. Leverage a library: Utilize a secure library such as `dotenv` or `env-var` for handling environment variables, or `node-secret-loader` for loading secrets from environment variables or files. These libraries provide better safety and abstraction in handling secrets.
//
//2. Encryption: Use encryption to protect secrets, especially when they're stored in configuration files or in a secure environment variable storage service like HashiCorp Vault. This prevents the secrets from being visible to anyone who gains access to the server's file system.
//
//3. Secure the environment variables storage: Store your secrets in environment variables rather than in your code, but be careful about where these environment variables are stored. Do not hard-code them directly in the source code. Instead, consider using tools like `dotenv`, which let you store environment variables in a `.env` file and load them only in development and testing environments.
//
//4. Use a configuration management tool: Employ a configuration management tool like `Fig` or `Kelsey Hightower's envconfig` that can help you manage and securely store secrets and configuration data. These tools can also ensure that secrets are only available to the specific services that need them.
//
//5. Limit access: Restrict access to secrets by using process isolation (like containers) or user permissions. This way, even if an attacker gains access to one process, they won't necessarily have access to secrets stored in other processes.
//
//6. Audit and monitor: Log any access to secrets, and monitor for unusual or unauthorized activity. This helps you detect if there have been breaches, and enables you to respond quickly.
//
//7. Regularly rotate secrets: Periodically rotate sensitive secrets, especially those used for authentication and cryptographic purposes, to limit the potential damage caused by a possible compromise.
//
//	By following these best practices, you can significantly improve the security of handling secrets in Node.js applications.



export interface HttpServerConfiguration {
	port: number
	host: string
	protocol: "http" | "https"
}

export interface Configuration {
	environment: "production" | "staging" | "testing" | "development" | "local"
	http: HttpServerConfiguration
	cacheMechanism: "redis" | "memcached" | "memory"
}


type ConfigType<K extends keyof Configuration> = K extends "http" ? HttpConfig : never;

type HttpConfig = {
	port: number; host: string; protocol: "http" | "https";
};


export interface ConfigurationLoader {
	load(): Promise<Partial<Configuration>>
}


export class DotEnvConfigurationLoader implements ConfigurationLoader {
	async load(): Promise<Partial<Configuration>> {
		return {}
	}
}


export class RcLoader implements ConfigurationLoader {
	async load(): Promise<Partial<Configuration>> {
		return {}
	}
}

export class ConfigCatLoader implements ConfigurationLoader {
	async load(): Promise<Partial<Configuration>> {
		return {}
	}
}


/** Configuration Manager is a core service that's responsible for managing the configuration of the application.
 *  It's important to notice this class isn't intended to handle secrets themselves as they shouldn't be persisted
 *  or available in selected methods.
 *  For the secure operations, there's a secret manager that handles these values in a safe way. */
export class ConfigurationManager {
	private readonly loaders: ConfigurationLoader[] = []


	/// Loads configuration from specified sources
	async load(): Promise<void> {
		return Promise.resolve()
	}


	async get<K extends keyof Configuration>(key: K): Promise<Configuration[K]> {
		return Promise.resolve({} as any)
	}

	async set<K extends keyof Configuration>(key: K, value: Configuration[K]): Promise<void> {
		return Promise.resolve()
	}

	async reset(): Promise<void> {
		return Promise.resolve()
	}
}