import {Injectable}   from "@nestjs/common"
import {CacheManager} from "./cache-manager.js"



@Injectable()
export class InMemoryCacheManager extends CacheManager {
	//noinspection LocalVariableNamingConventionJS
	private _cache: Map<string, unknown>                                   = new Map<string, unknown>();
	//noinspection LocalVariableNamingConventionJS
	private _ttl: Map<string, { expiry: number, timeout: NodeJS.Timeout }> = new Map<string, {
		expiry: number, timeout: NodeJS.Timeout
	}>();


	public async delete(key: string): Promise<void> {
		this._cache.delete(key)
		const ttlObject = this._ttl.get(key)

		if (ttlObject) {
			clearTimeout(ttlObject.timeout)
			this._ttl.delete(key)
		}

		return Promise.resolve(undefined)
	}


	public async exists(key: string): Promise<boolean> {
		return this._cache.has(key)
	}


	//noinspection LocalVariableNamingConventionJS
	public async get<T = unknown>(key: string): Promise<T | null> {
		const value = this._cache.get(key)

		if (value) {
			return value as T
		}

		return null
	}


	public set(key: string, value: unknown, ttl?: number): Promise<void> {
		this._cache.set(key, value)

		if (ttl) {
			const timeout = setTimeout(() => {
				this._cache.delete(key)
				this._ttl.delete(key)
			}, ttl)

			this._ttl.set(key, {
				expiry:  Date.now() + ttl,
				timeout: timeout,
			})
		}

		return Promise.resolve(undefined)
	}


	public async clear(): Promise<void> {
		this._cache.clear();
		this._ttl.forEach((value, key) => {
			clearTimeout(value.timeout);
		});

		this._ttl.clear();
		return Promise.resolve(undefined);
	}


	public async getAll<T = unknown>(): Promise<T[]> {
		return Array.from(this._cache.values()) as T[];
	}


	public async keys(): Promise<string[]> {
		return Array.from(this._cache.keys());
	}


	public async ttl(key: string): Promise<number> {
		const cacheTtl = this._ttl.get(key);

		if (!cacheTtl) {
			return -1;
		} else {
			return Math.max(cacheTtl.expiry - Date.now(), 0);
		}
	}
}