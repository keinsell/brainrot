/**
 * Represents an abstract class for managing cache.
 */
export abstract class CacheManager {
	abstract get<T = unknown>(key: string): Promise<T | null>;


	abstract set(key: string, value: unknown, ttl?: number): Promise<void>;


	abstract delete(key: string): Promise<void>;


	abstract exists(key: string): Promise<boolean>;
}